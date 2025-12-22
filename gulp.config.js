import yargs            from 'yargs';
import { hideBin }      from 'yargs/helpers';
import webpack          from "webpack";

import typescript       from '@rollup/plugin-typescript';
import resolve          from '@rollup/plugin-node-resolve';
import  { minify }      from 'rollup-plugin-esbuild-minify';
import commonjs         from '@rollup/plugin-commonjs';

 
const 
    VERSION       = '1.0.0',
    argv          = yargs(hideBin(process.argv)).argv,
    PRODUCTION    = !!argv.prod,
    BUILD_DEMO    = !!argv.demo,

    destPath      = BUILD_DEMO ? 'demo' : 'dist' ,
    rollupBasePlugins = [resolve(), typescript(), commonjs()]
;

const jsDemoPaths = [
    'src/demo/assets/js/demo.ts',
    'src/demo/assets/js/demo-cash.ts'
]
const jsPaths = [];

if (BUILD_DEMO ) {
    jsPaths.push(...jsDemoPaths)
} else {
    jsPaths.push(
        'src/assets/js/**/*.ts'
    );

    if (!PRODUCTION) {
        jsPaths.push(...jsDemoPaths);
    }
}

 

const config = {
    version: VERSION,
    production: PRODUCTION,
    buildDemo: BUILD_DEMO,
    src: {
        img:    'src/demo/assets/img/**/*.{jpg,png,webp,svg,gif}',
        css:    ['src/assets/scss/**/*.scss', 'src/demo/assets/scss/**/*.scss'],
        js:     jsPaths,
        jsMain: 'src/assets/js/index.ts',
        html:   [BUILD_DEMO ? 'src/demo/index.{html,hbs}' : 'src/demo/**/*.{html,hbs}'],
        readme: 'src/readmes/_readme.md'
    },

    dest: destPath,
    handlbars:  {
        config: {
            ignorePartials: true,
            batch: ['src/demo/_partials'],
            partials: null
        },
        vars: {
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

    rollup : {

        minified: {
            output: {
                // format: 'cjs', 
                sourcemap: !PRODUCTION
            },
            plugins: [
                ...rollupBasePlugins,
                PRODUCTION ? minify() : null
            ].filter(Boolean),
            isCache: true
        },
        es: {
            output: {
                // name: 'baseFrame',
                format: 'es',
                sourcemap: true,
                generatedCode: 'es2015'
            },
            plugins: [...rollupBasePlugins],
            isCache: true
        },
        umd: {
            output: {
                name: 'baseFrame',
                format: 'umd',
                sourcemap: true,
                generatedCode: 'es2015'
            },
            plugins: [...rollupBasePlugins],
            isCache: true
        } 
    },

    webpackConfig: {
        // devtool: (PRODUCTION ? false : "eval"),
        mode: (PRODUCTION ? "production" : "development"),
        target: ["web", "es6"],
        resolve: {
            extensions: [".js", ".tsx", ".ts"]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /(node_modules\/(?!(@hilemangroup)))/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                ENV_CONFIG: {
                    production: false,
                }
            })
        ]
    }

}

 

export default config;