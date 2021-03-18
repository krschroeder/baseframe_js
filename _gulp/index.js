import gulp, { src } from 'gulp';
import path from 'path';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';

import handlebars    from 'gulp-compile-handlebars';
import helpers       from 'handlebars-helpers';

import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import clean from 'gulp-clean';
import fileinclude from 'gulp-file-include';

//es6 javascript
//this version of babel is needed for the plugin generation
//since webpack isn't playing well with outputting to the same directory

import named from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
 

import config from './config';

const {
    DEST,
    HBS,
    PRODUCTION,
    SRC,
    WEBPACK_CONFIG
} = config;
 
const {CSS, JS, HTML} = SRC;

// Load Handlebars helpers
helpers({
	handlebars: handlebars.Handlebars
});

 

//tasks

function buildCSS(done){
	if (!PRODUCTION) { 
		return gulp.src(CSS)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ["last 2 versions","ie >= 11","ios >= 11"]
			}))
			.pipe(gulpIf(PRODUCTION, cleanCss({
				compatibility: "ie11"
			})))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(`${DEST}/assets/css`))
			.pipe(browser.reload({ stream: true }));
	}

	done();
}


function buildHTML(done){
	if (!PRODUCTION) { 
		return gulp.src(HTML)
			.pipe(handlebars(HBS.vars,HBS.handlebars))
			.pipe(gulp.dest(DEST));
	}

	done();
}


function buildJS(done){
	if (!PRODUCTION) {
		return gulp.src(JS)
			.pipe(named())
			.pipe(webpackStream(WEBPACK_CONFIG, webpack))
			.pipe(gulp.dest(DEST+'/assets/js'));
	}

	done();
}

// function buildJSDist(done){
// 	if (PRODUCTION) {
// 		return gulp.src('./scripts-all.js')
// 			.pipe(named())
// 			.pipe(webpackStream(WEBPACK_CONFIG, webpack))
// 			.pipe(gulp.dest('dist/'));
// 	}
	
// 	done();
// }

function copyAssets(done) {
	if (!PRODUCTION) { 
		return gulp.src('src/proj-assets/img/**/*')
			.pipe(gulp.dest(DEST+'/assets/img'));
	}
	done();
}

function cleanUp(){
	return gulp.src([
			path.resolve(DEST, '**/*.{html,css,js}'),
			'dist/'
		],{
		read: false,
		allowEmpty: true
	})
	.pipe(clean());
}

function compileReadme() {
	return gulp.src('src/readmes/_readme.md')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(rename({
			basename: 'readme'
		}))
		.pipe(gulp.dest('./'));
}


function watch(done){
	if (!PRODUCTION) {
		gulp.watch(JS).on('all',gulp.series(buildJS, reload));
		gulp.watch(CSS).on('all',gulp.series(buildCSS));
		gulp.watch('src/assets/scss/**/*.scss').on('all',gulp.series(buildCSS));
		gulp.watch('src/proj-assets/img/**/*').on('all',gulp.series(copyAssets));
		gulp.watch(['src/**/*.{html,hbs}']).on('all',gulp.series(buildHTML, reload));
		gulp.watch('src/readmes/*.md').on('all',gulp.series(compileReadme));
	}
	done();
}

 
//
// Server
function server(done) {
	if (!PRODUCTION) {
		// Start a server with BrowserSync to preview the site in
		browser.init({
			server: DEST,
			port: 8000,
			extensions: ['html'] // pretty urls
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

const BUILD = gulp.parallel(

	gulp.series(
		cleanUp,
		buildCSS,
		buildJS,
		// buildJSDist,
		buildHTML,
		copyAssets,
		server,
		compileReadme,
		watch
	)
);

gulp.task('default', BUILD);