import path from 'path';
import yargs from 'yargs';

const VERSION       = require('./package.json').version;

const PRODUCTION    = !!yargs.argv.prod;
const BUILD_DEMO    = !!yargs.argv.demo;
const PROD_JS       = (PRODUCTION || BUILD_DEMO);
const USE_JQUERY    = !!yargs.argv.jquery;

// const SOURCE = alias('./src');
const excludeRgx = /(node_modules)/;

const destPath = BUILD_DEMO ? 'demo' : 'dist';

const alias = (src) => path.resolve(__dirname, src);

const config = {
    version: VERSION,
    production: PRODUCTION,
    buildDemo: BUILD_DEMO,
    src: {
        img:    'src/demo/assets/img/**/*.{jpg,png,webp,svg,gif}',
        css:    ['src/assets/scss/**/*.scss', 'src/demo/assets/scss/**/*.scss'],
        js:     BUILD_DEMO ? 'src/demo/assets/js/demo.ts' : [
                    'src/assets/js/**/*.ts',
                    //'!src/assets/js/**/*.d.ts', 
                    PRODUCTION ? '': 'src/demo/assets/js/demo.ts'
                ].filter(e => e),
        html:   [BUILD_DEMO ? 'src/demo/index.{html,hbs}' : 'src/demo/**/*.{html,hbs}'],
        readme: 'src/readmes/_readme.md',
        dts:    'src/assets/js/**/*.d.ts',
        tmp:    '.tmp'
    },

    dest: destPath,

    handlbars:  {
        config: {
            ignorePartials: true,
            batch: ['src/demo/_partials'],
            partials: null
        },
        vars: {
            'use-jquery': USE_JQUERY,
            version: VERSION,
            path: {
                root: BUILD_DEMO ? "./demo/" : './',
            },
            placeholder: `https://via.placeholder.com/`
        }
    },

    tsProdConfig: {
        lib: ["esNext", "dom"],
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "Node"
    },

    webpackConfig: {
        mode: (PROD_JS ? 'production': 'development'),
        target: ['web','es6'],
        resolve: {
            extensions: ['.js', '.tsx', '.ts'],
            alias: {
                "@":        alias("../src/assets/js/"),
                "@core":    alias("../src/assets/js/core/"),
                "@fn":      alias("../src/assets/js/fn/"),
                "@util":    alias("../src/assets/js/util/")
            } 
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: excludeRgx,
                    loader: "ts-loader" 
                }
            ]
        },
        
        externals: { 
            'cash-dom': '$'
        },
        
        optimization: {
            minimize: PRODUCTION
        },
        output: {
            libraryTarget: 'umd',
            filename: 'index.bundled.min.js',
        }
    }
}

 

export default config;