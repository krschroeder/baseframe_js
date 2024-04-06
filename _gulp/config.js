import path from 'path';
import yargs from 'yargs';

const VERSION       = require('../package.json').version;

const PRODUCTION    = !!yargs.argv.prod;
const PROD_JS       = (!!yargs.argv.productionjs || PRODUCTION);
const USE_JQUERY    = !!yargs.argv.jquery;
const DEMO_DEST     = !!yargs.argv.demo;

// const SOURCE = alias('./src');
const excludeRgx = /(node_modules)/;

const destPath = DEMO_DEST ? 'demo' : 'dist';

const alias = (src) => path.resolve(__dirname, src);

const config = {
    version: VERSION,
    production: PRODUCTION,
    
    src: {
        img:    'src/demo/assets/img/**/*.{jpg,png,webp,svg,gif}',
        css:    ['src/assets/scss/**/*.scss', 'src/demo/assets/scss/**/*.scss'],
        js:     [
                    'src/assets/js/**/*.{js,ts}',
                    '!src/assets/js/**/*.d.ts', 
                    PRODUCTION ? '': 'src/demo/assets/js/demo.{ts,js}'
                ].filter(e => e),
        html:   ['src/demo/**/*.{html,hbs}'],
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
                root:"./src",
            },
            placeholder: `https://via.placeholder.com/`
        }
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
                    test: /\.jsx?$/,
                    exclude: excludeRgx,
                    loader: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: excludeRgx,
                    loader: "ts-loader" 
                },
                {
                    test: /src\/assets\/js\/index\.ts/i,
                    sideEffects: false
                }
            ]
        },
        
        externals: { 
            'cash-dom': '$',
            'jquery': 'jQuery'
        },
        
        optimization: {
            minimize: false
        }
    }
}

export default config;