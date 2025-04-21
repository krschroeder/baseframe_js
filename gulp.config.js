import yargs            from 'yargs';
import typescript       from '@rollup/plugin-typescript';
import resolve          from '@rollup/plugin-node-resolve';
import  { minify }      from 'rollup-plugin-esbuild-minify';
import commonjs         from '@rollup/plugin-commonjs';
const 
    VERSION       = require('./package.json').version || '1.0.0',
    PRODUCTION    = !!yargs.argv.prod,
    BUILD_DEMO    = !!yargs.argv.demo,

    destPath      = BUILD_DEMO ? 'demo' : 'dist' ,
    rollupBasePlugins = [resolve(), typescript(), commonjs()]
;

const config = {
    version: VERSION,
    production: PRODUCTION,
    buildDemo: BUILD_DEMO,
    src: {
        img:    'src/demo/assets/img/**/*.{jpg,png,webp,svg,gif}',
        css:    ['src/assets/scss/**/*.scss', 'src/demo/assets/scss/**/*.scss'],
        js:     BUILD_DEMO ? 'src/demo/assets/js/demo.ts' : [
                    'src/assets/js/**/*.ts',
                    PRODUCTION ? '': 'src/demo/assets/js/demo.ts'
                ].filter(e => e),
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

        lib: {
            output: {
                name: 'baseFrame',
                format: 'iife', 
                sourcemap: !PRODUCTION
            },
            plugins: [
                ...rollupBasePlugins,
                PRODUCTION ? minify() : null
            ].filter(Boolean)
        },
        module: {
            output: {
                name: 'baseFrame',
                format: 'umd',
                sourcemap: !PRODUCTION 
            },
            plugins: [...rollupBasePlugins]
        }
    }

}

 

export default config;