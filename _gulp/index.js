import gulp           from "gulp";
// general
import browser        from "browser-sync";
import rename         from "gulp-rename";
import sourcemaps     from "gulp-sourcemaps";
import gulpIf         from "gulp-if";
import clean          from "gulp-clean";
import fileinclude    from "gulp-file-include";
import tap            from "gulp-tap";

// html
import handlebars     from "gulp-compile-handlebars";
import helpers        from "handlebars-helpers";

// css
import sassEngine     from "sass";
import gulpSass       from "gulp-sass";
import autoprefixer   from "gulp-autoprefixer";
import cleanCss       from "gulp-clean-css";

// Development JS plugins
import named          from "vinyl-named";
import webpack        from "webpack";
import webpackStream  from "webpack-stream";

// Production JS plugins
import rollupEach     from 'gulp-rollup-each'; 
import typescript     from "gulp-typescript";
import ts 				    from 'typescript';
import config         from "../gulp.config";
import  { minify }    from 'rollup-plugin-esbuild-minify';

const { buildDemo, production } = config;
// Load Handlebars helpers
helpers({ handlebars: handlebars.Handlebars });

const sass = gulpSass(sassEngine);

//region tasks

function buildCss() {
  if (!production) {
    return gulp
      .src(config.src.css)
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(
        gulpIf(
          production || buildDemo,
          cleanCss({
            compatibility: "ie11",
          })
        )
      )
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(`${config.dest}/assets/css`))
      .pipe(browser.reload({ stream: true }));
  } else {
    // Production
    return gulp.src(config.src.css).pipe(gulp.dest(`${config.dest}/scss`));
  }
}

function buildHtml(done) {
  if (!production) {
    return gulp
      .src(config.src.html)
      .pipe(handlebars(config.handlbars.vars, config.handlbars.config))
      .pipe(rename({ extname: ".html" }))
      .pipe(gulp.dest(buildDemo ? "." : config.dest));
  }

  done();
}

const buildDevJs = (done) => {
    if (!production) {

        return gulp.src(config.src.js)
        .pipe(named())
        .pipe(webpackStream(config.webpackConfig, webpack))
        .pipe(gulp.dest( `${config.dest}${production ? '' : '/assets'}/js` ));
    } else done();
}

const buildProdJsMin = (done) => {
    if (production) {

        return gulp.src(config.src.jsMain)
        .pipe(sourcemaps.init())
        .pipe(rollupEach(config.rollup.minified))
        .pipe(rename({ extname: '.js', suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest( `${config.dest}${production ? '' : '/assets'}/js` ));
    } else done();
}

const buildProdJs = (done) => {
    if (production) {

        return gulp.src(config.src.js).pipe(tap(function (file) {	 
            const contents = file.contents.toString('utf-8');
            const transpiledToJs = ts.transpile(contents, config.tsProdConfig);
            file.contents = Buffer.from(transpiledToJs);
        }))
        .pipe(rename({ extname: '.js'}))
        .pipe(gulp.dest(`${config.dest}/js`));
    } else done();
}

const buildTypeJs = (type, min = false) => {
    const rollupBundle = config.rollup[type];
    const suffix = '.' + type + (min ? '.min' : '');
    // not creating a deep clone so minify last
    if (min) rollupBundle.plugins.push(minify());

    if (production) {
        return gulp.src(config.src.jsMain)
            .pipe(sourcemaps.init())
            .pipe(rollupEach(rollupBundle))
            .pipe(rename({ extname: '.js', suffix }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(`${config.dest}/js`))
        ;
    }
    done();
}
const buildUmdJs = (done) => {
    if(production) return buildTypeJs('umd');
    done();
}

const buildEsmJs = (done) => {
    if(production) return buildTypeJs('es');
    done();
}

const buildUmdJsMin = (done) => {
    if(production) return buildTypeJs('umd', true);
    done();
}

const buildEsmJsMin = (done) => {
    if(production) return buildTypeJs('es', true);
    done();
}


const buildJsDeclarations = (done) => {
  if (production) {
    const tsProject = typescript.createProject("tsconfig.json", {
      declaration: true,
      emitDeclarationOnly: true,
    });

    return gulp
      .src(config.src.js)
      .pipe(tsProject())
      .pipe(gulp.dest(`${config.dest}/js`))
  }
  done();
};

function copyAssets(done) {
  if (!production) {
    return gulp
      .src(config.src.img)
      .pipe(gulp.dest(`${config.dest}/assets/img`));
  }
  done();
}

function cleanUp() {
  return gulp
    .src([config.dest, ".tmp"], {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

function cleanUpTemp() {
  return gulp
    .src(".tmp", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

// region readme
function compileReadme() {
  return gulp
    .src(config.src.readme)
    .pipe(fileinclude({ prefix: "@@", basepath: "@file" }))
    .pipe(rename({ basename: "readme" }))
    .pipe(gulp.dest("./"));
}

//region watch

function watch(done) {
  if (!production && !buildDemo) {
    gulp.watch(config.src.js).on("all", gulp.series(buildDevJs, reload));
    gulp.watch(config.src.css).on("all", gulp.series(buildCss));
    // gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(buildCss));
    gulp.watch(config.src.img).on("all", gulp.series(copyAssets));
    gulp.watch(config.src.html).on("all", gulp.series(buildHtml, reload));
    gulp.watch(config.src.readme).on("all", gulp.series(compileReadme));
  }
  done();
}

// region server

function server(done) {
    if (!production && !buildDemo) {
        // Start a server with BrowserSync to preview the site in
        browser.init({
        server: config.dest,
        port: 8000,
        extensions: ["html"], // pretty urls
        });
    }
    done();
}

// Reload the browser with BrowserSync
function reload(done) {
    browser.reload();
    done();
}

// region gulp tasks
const BUILD = gulp.series(
    cleanUp,
    buildCss,
    buildDevJs,
    buildProdJs,
    buildProdJsMin,
    buildUmdJs,
    buildEsmJs,
    buildEsmJsMin,
    buildUmdJsMin,
    buildJsDeclarations,
    buildHtml,
    copyAssets,
    server,
    compileReadme,
    watch,
    cleanUpTemp
);

gulp.task("default", BUILD);
