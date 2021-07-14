import path from 'path';
import yargs from 'yargs';

const VERSION = require('../package.json').version;

const PRODUCTION = !!yargs.argv.prod;
const PROD_JS = (!!yargs.argv.productionjs || PRODUCTION);
const USE_JQUERY = !!yargs.argv.jquery;

const SOURCE = path.resolve(__dirname, './src');
const excludeRgx = /(node_modules)/;

const config = {
    
    DEST: 'build',
    PRODUCTION: PRODUCTION,
    
    SRC: {
        CSS: ['src/proj-assets/scss/**/*.scss','src/assets/scss/**/*.scss'],
        HTML: ['src/pages/**/*.{html,hbs}'],
        JS: ['src/assets/js/**/*.js','src/proj-assets/js/common-all-test.js']
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
                    exclude: excludeRgx,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                {
                    test: /\.(tsx|ts)?$/,
                    exclude: excludeRgx,
                    loader: "ts-loader" 
                }
            ]
        },
        
        externals: {
            jquery: 'jQuery',
            'cash-dom': '$'
        },
        
        optimization: {
            minimize: true 
        },

        output: {
            libraryTarget: 'umd'
        }
    }
}

export default config;