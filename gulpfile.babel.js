const VERSION = require('./package.json').version;

import gulp from 'gulp';
import path from 'path';
import yargs from 'yargs';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';

import handlebars    from 'gulp-compile-handlebars';
import helpers       from 'handlebars-helpers';

import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import flatten from 'gulp-flatten';
import clean from 'gulp-clean';
import fileinclude from 'gulp-file-include';

//es6 javascript
//this version of babel is needed for the plugin generation
//since webpack isn't playing well with outputting to the same directory

import named from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { argv } from 'process';


//--production flag
const PRODUCTION = !!yargs.argv.prod;
const PROD_JS = (!!yargs.argv.productionjs || PRODUCTION);
const USE_JQUERY = !!yargs.argv.jquery;

// Load Handlebars helpers
helpers({
	handlebars: handlebars.Handlebars
});

const DEST = 'build';
const PLUGINS = [
	'src/collapse/',
	'src/equalize-content/',
	'src/marketo-form/',
	'src/nav-desktop/',
	'src/nav-mobile/',
	'src/parallax/',
	'src/popup/',
	'src/responsive-dropdown/',
	// 'src/sticky-animate/',
	'src/tabs/',
];

const PLUGIN_CSS = pluginsFindType('*.scss');
const PLUGIN_HTML = ['src/index.html',...pluginsFindType('*.html')];
const PLUGIN_JS = './src/plugins/js/*.{js,ts}';

const SOURCE = path.resolve(__dirname, './src');

const WEBPACK_CONFIG = {
	mode: (PROD_JS ? 'production': 'development'),
	resolve: {
		alias: {
			components: SOURCE,
		},
		extensions: ['.js']
	},
	context: SOURCE,
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /(node_modules\/(?!(@hilemangroup|bootstrap)))/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.(tsx|ts)?$/,
				exclude: /(node_modules\/(?!(@hilemangroup|bootstrap)))/,
				loader: "ts-loader" 
			}
		]
	},
	
	externals: {
		jquery: 'jQuery',
		'cash-dom': '$'
	},
	optimization: {
		minimize: true,
		mangleWasmImports: false
	}
};

const hbs = {
	handlebars: {
		ignorePartials: true,
		batch: ['src/_partials'],
		partials: null
	},
	vars: {
		'use-jquery': USE_JQUERY,
		version: VERSION,
		path: {
			root:"./src",
		},
		placeholder: `https://via.placeholder.com/`
	}
}


//utility
function pluginsFindType(fileType){
	let plugins = [];

	for(let i = 0,l = PLUGINS.length; i < l; i++){
		plugins.push( PLUGINS[i] + fileType);
	}
	return plugins;
}


//tasks

function buildCSS(){
	return gulp.src('src/assets/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions","ie >= 11","ios >= 11"]
		}))
		.pipe(gulpIf(PRODUCTION, cleanCss({
			compatibility: "ie11"
		})))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${DEST}/css`))
		.pipe(browser.reload({ stream: true }));
}

function pluginCSS(){

	return gulp.src(PLUGIN_CSS)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions","ie >= 11","ios >= 11"]
		}))
		.pipe(gulpIf(PRODUCTION, cleanCss({
			compatibility: "ie11"
		})))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DEST+'/css'))
		.pipe(browser.reload({ stream: true }));
}

function pluginHTML(){

	return gulp.src(PLUGIN_HTML)
		.pipe(handlebars(hbs.vars,hbs.handlebars))
		.pipe(gulp.dest(function(file){
			let base = file.base.slice(file.base.lastIndexOf('/')+1);

			if(base === 'src'){
				base = '';
			}
			return path.resolve(DEST,base);
		}));
}


function pluginJS(){
	return gulp.src(PRODUCTION ? PLUGIN_JS: 'src/_partials/common-all-test.js')
		.pipe(named())
		.pipe(webpackStream(WEBPACK_CONFIG, webpack))
		.pipe(gulp.dest(DEST+'/js'));
}

function copyAssets(){
	return gulp.src('src/assets/img/**/*')
		.pipe(gulp.dest(DEST+'/img'));
}

function cleanUp(){
	return gulp.src([
			path.resolve(DEST, '**/*.{html,css,js}')
		],{
		read: false,
		allowEmpty: true
	})
	.pipe(clean());
}

function compileReadme() {
	return gulp.src('src/readme.md')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./'));
}


function watch(){
	gulp.watch([PLUGIN_JS, 'src/util/**/*.{js,ts}']).on('all',gulp.series(pluginJS, reload));
	gulp.watch(PLUGIN_CSS).on('all',gulp.series(pluginCSS));
	gulp.watch('src/assets/scss/**/*.scss').on('all',gulp.series(buildCSS));
	gulp.watch('src/assets/img/**/*').on('all',gulp.series(copyAssets));
	gulp.watch(['src/**/*.{html,hbs}']).on('all',gulp.series(pluginHTML, reload));
	gulp.watch('src/readme.md').on('all',gulp.series(compileReadme));
}


//
// Server
function server(done) {
	// Start a server with BrowserSync to preview the site in
	browser.init({
		server: DEST,
		port: 8000
	});
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
		pluginCSS,
		pluginJS,
		pluginHTML,
		copyAssets,
		server,
		compileReadme,
		watch
	)
);

gulp.task('default', BUILD);
