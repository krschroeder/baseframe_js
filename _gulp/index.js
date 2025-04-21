import gulp from "gulp";
// general
import browser from "browser-sync";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import gulpIf from "gulp-if";
import clean from "gulp-clean";
import fileinclude from "gulp-file-include";
import tap from "gulp-tap";

// html
import handlebars from "gulp-compile-handlebars";
import helpers from "handlebars-helpers";

// css
import sassEngine from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";

// import named from "vinyl-named";
// import webpack from "webpack";
// import webpackStream from "webpack-stream";

 
import rollupEach               from 'gulp-rollup-each'; 
import typescript from "gulp-typescript";
import config from "../gulp.config";

const { buildDemo, production } = config;
// Load Handlebars helpers
helpers({ handlebars: handlebars.Handlebars });

 

const sass = gulpSass(sassEngine);
//tasks

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



const buildJS = () =>
    gulp.src(config.src.js)
    .pipe(sourcemaps.init())
    .pipe(rollupEach(config.rollup.lib))
    .pipe(rename({ extname: production ? '.min.js' : '.js' }))
    .pipe(gulpIf(!production, sourcemaps.write('.')))
    .pipe(gulp.dest( `${config.dest}${production ? '' : '/assets'}/js` ))
;
const buildModuleJS = (done) => {
    if (production) {
        return gulp.src(config.src.js)
            .pipe(sourcemaps.init())
            .pipe(rollupEach(config.rollup.module))
            .pipe(rename({ extname: '.js' }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(`${config.dest}/cjs`))
        ;
    }
    done();
}

// function buildMainJs(done) {
//   if (production) {
//     // just turn it into JS files
//     gulp
//       .src(config.src.js)
//       .pipe(
//         tap(function (file) {
//           const contents = file.contents.toString("utf-8");
//           const transpiledToJs = ts.transpile(contents, config.tsProdConfig);
//           file.contents = Buffer.from(transpiledToJs);
//         })
//       )
//       .pipe(rename({ extname: ".js" }))
//       .pipe(gulp.dest(`${config.dest}/js`));
//   } else {
//     return gulp
//       .src(config.src.js)
//       .pipe(named())
//       .pipe(webpackStream(config.webpackConfig, webpack))
//       .pipe(gulpIf(buildDemo, uglify()))
//       .pipe(gulp.dest(`${config.dest}/assets/js`));
//   }
//   done();
// }

// const buildCJs = (done) => {
//   if (production) {
//     const tsProject = typescript.createProject("tsconfig.json");

//     return gulp
//       .src(config.src.js)
//       .pipe(tsProject())
//       .pipe(babel())
//       .pipe(gulp.dest(`${config.dest}/cjs`));
//   }
//   done();
// };

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
      .pipe(gulp.dest(`${config.dest}/cjs`));
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

function compileReadme() {
  return gulp
    .src(config.src.readme)
    .pipe(fileinclude({ prefix: "@@", basepath: "@file" }))
    .pipe(rename({ basename: "readme" }))
    .pipe(gulp.dest("./"));
}

function watch(done) {
  if (!production && !buildDemo) {
    gulp.watch(config.src.js).on("all", gulp.series(buildJS, reload));
    gulp.watch(config.src.css).on("all", gulp.series(buildCss));
    // gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(buildCss));
    gulp.watch(config.src.img).on("all", gulp.series(copyAssets));
    gulp.watch(config.src.html).on("all", gulp.series(buildHtml, reload));
    gulp.watch(config.src.readme).on("all", gulp.series(compileReadme));
  }
  done();
}

//
// Server

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

//
// Reload the browser with BrowserSync
function reload(done) {
    browser.reload();
    done();
}

const BUILD = gulp.series(
    cleanUp,
    buildCss,
    buildJS,
    buildModuleJS,
    buildJsDeclarations,
    buildHtml,
    copyAssets,
    server,
    compileReadme,
    watch,
    cleanUpTemp
);

gulp.task("default", BUILD);
