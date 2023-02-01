import { defineConfig, UserConfig } from 'vite'
import { resolve } from 'path'
import typescript from "@rollup/plugin-typescript";

/**
 * @description 打包配置
 */
const buildConfig: UserConfig = {
    base: './',
    plugins: [
        typescript({
            target: 'esnext',
            module: 'esnext',
            rootDir: resolve('./lib'),
            declaration: true,
            declarationDir: resolve('./dist'),
            exclude: resolve('node_modules/**')
        })
    ],
    build: {
        lib: {
            name: 'rustyjs',
            fileName: 'index',
            entry: resolve(__dirname, './lib/index.ts'),
            formats: [ 'es', 'cjs' ]
        },
        minify: 'esbuild',
        // rollupOptions: {
        //     output: {
        //         manualChunks: (id, meta) => {
        //             if(id.includes('node_modules'))
        //                 return id.toString()
        //                     .split('node_modules/')[1]
        //                     .split('/')[0]
        //                     .toString()
        //             else if(id.includes('.svg'))
        //                 return id.split('/')
        //                     .slice(-1)[0]
        //                     .replace('.', '_')
        //         }
        //     }
        // }
    },
    esbuild: {
        drop: [ 'console', 'debugger' ],
    }
}

export default defineConfig(buildConfig)
