import path from 'path';
import yargs from 'yargs';

const VERSION = require('../package.json').version;

const PRODUCTION = !!yargs.argv.prod;
const PROD_JS = (!!yargs.argv.productionjs || PRODUCTION);
const USE_JQUERY = !!yargs.argv.jquery;

// const SOURCE = path.resolve(__dirname, './src');
const excludeRgx = /(node_modules)/;

const config = {
    
    DEST: 'build',
    PRODUCTION: PRODUCTION,
    
    SRC: {
        css: PRODUCTION ? 'src/assets/scss/**/*.scss' : ['src/proj-assets/scss/**/*.scss','src/assets/scss/**/*.scss'],
        html: ['src/pages/**/*.{html,hbs}'],
        js: PRODUCTION ? 'src/assets/js/**/*.{js,ts}' : ['src/proj-assets/js/common-all-test.ts', 'src/assets/js/**/*.{js,ts}'],
        dts: 'src/assets/js/**/*.d.ts'
    },

    HBS:  {
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
    },

    WEBPACK_CONFIG: {
        mode: (PROD_JS ? 'production': 'development'),
        target: ['web','es6'],
        resolve: {
            extensions: ['.js', '.tsx', '.ts']
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: excludeRgx,
                    loader: 'babel-loader'
                },
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
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
            minimize: false
        },

        // output: {
        //     library: {
        //         // name: 'MyLibrary',
        //         type: 'umd'
        //       },
        // }
    }
}

export default config;