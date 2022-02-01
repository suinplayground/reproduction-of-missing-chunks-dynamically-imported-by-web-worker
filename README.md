# Chunks dynamically imported by Web Workers are missing in Vite build

This repository provides the reproduction code of the problem that `vite build` loses chunks which are dynamically imported by Web Workers.

## Describe the bug

When a worker code dynamic-imports a module, `vite build` will not generate the bundle of the module.

### vite.config.js

```js
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  worker: {
    format: "es", // enable code-splitting
  },
});
```

### src/worker.js

```js
import("./myModule.js").then(() => {
  console.log("myModule.js was imported")
});
```

### src/myModule.js

```js
console.log("Hello from myModule.js");
```

### src/main.js

```js
import MyWorker from "./worker.js?worker";
new MyWorker();
```

### `vite build` logs

<details><summary>show full logs</summary>

```sh
$ vite build --debug
  vite:config bundled config file loaded in 53.98ms +0ms
  vite:config using resolved config: {
  vite:config   build: {
  vite:config     target: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
  vite:config     polyfillModulePreload: true,
  vite:config     outDir: '/Volumes/v/suinplayground/reproduction-of-missing-chunks-dynamically-imported-by-web-worker/dist',
  vite:config     assetsDir: 'assets',
  vite:config     assetsInlineLimit: 4096,
  vite:config     cssCodeSplit: true,
  vite:config     cssTarget: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
  vite:config     sourcemap: false,
  vite:config     rollupOptions: {
  vite:config       input: '/Volumes/v/suinplayground/reproduction-of-missing-chunks-dynamically-imported-by-web-worker/index.html'
  vite:config     },
  vite:config     minify: false,
  vite:config     terserOptions: {},
  vite:config     write: true,
  vite:config     emptyOutDir: null,
  vite:config     manifest: false,
  vite:config     lib: false,
  vite:config     ssr: false,
  vite:config     ssrManifest: false,
  vite:config     reportCompressedSize: true,
  vite:config     chunkSizeWarningLimit: 500,
  vite:config     watch: null,
  vite:config     commonjsOptions: { include: [Array], extensions: [Array] },
  vite:config     dynamicImportVarsOptions: { warnOnError: true, exclude: [Array] }
  vite:config   },
  vite:config   worker: {
  vite:config     format: 'es',
  vite:config     plugins: [
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object], [Object],
  vite:config       [Object], [Object]
  vite:config     ],
  vite:config     rollupOptions: {}
  vite:config   },
  vite:config   configFile: '/Volumes/v/suinplayground/reproduction-of-missing-chunks-dynamically-imported-by-web-worker/vite.config.js',
  vite:config   configFileDependencies: [ 'vite.config.js' ],
  vite:config   inlineConfig: {
  vite:config     root: undefined,
  vite:config     base: undefined,
  vite:config     mode: undefined,
  vite:config     configFile: undefined,
  vite:config     logLevel: undefined,
  vite:config     clearScreen: undefined,
  vite:config     build: {}
  vite:config   },
  vite:config   root: '/Volumes/v/suinplayground/reproduction-of-missing-chunks-dynamically-imported-by-web-worker',
  vite:config   base: '/',
  vite:config   resolve: { dedupe: undefined, alias: [ [Object], [Object] ] },
  vite:config   publicDir: '/Volumes/v/suinplayground/reproduction-of-missing-chunks-dynamically-imported-by-web-worker/public',
  vite:config   cacheDir: '/Volumes/v/suinplayground/reproduction-of-missing-chunks-dynamically-imported-by-web-worker/node_modules/.vite',
  vite:config   command: 'build',
  vite:config   mode: 'production',
  vite:config   isProduction: true,
  vite:config   plugins: [
  vite:config     'alias',
  vite:config     'vite:modulepreload-polyfill',
  vite:config     'vite:resolve',
  vite:config     'vite:html-inline-proxy',
  vite:config     'vite:css',
  vite:config     'vite:esbuild',
  vite:config     'vite:json',
  vite:config     'vite:wasm',
  vite:config     'vite:worker',
  vite:config     'vite:worker-import-meta-url',
  vite:config     'vite:asset',
  vite:config     'vite:define',
  vite:config     'vite:css-post',
  vite:config     'vite:watch-package-data',
  vite:config     'vite:build-html',
  vite:config     'commonjs',
  vite:config     'vite:data-uri',
  vite:config     'rollup-plugin-dynamic-import-variables',
  vite:config     'vite:asset-import-meta-url',
  vite:config     'vite:build-import-analysis',
  vite:config     'vite:esbuild-transpile',
  vite:config     'vite:reporter',
  vite:config     'vite:load-fallback'
  vite:config   ],
  vite:config   server: {
  vite:config     preTransformRequests: true,
  vite:config     fs: { strict: true, allow: [Array], deny: [Array] }
  vite:config   },
  vite:config   preview: {
  vite:config     port: undefined,
  vite:config     strictPort: undefined,
  vite:config     host: undefined,
  vite:config     https: undefined,
  vite:config     open: undefined,
  vite:config     proxy: undefined,
  vite:config     cors: undefined,
  vite:config     headers: undefined
  vite:config   },
  vite:config   env: { BASE_URL: '/', MODE: 'production', DEV: false, PROD: true },
  vite:config   assetsInclude: [Function: assetsInclude],
  vite:config   logger: {
  vite:config     hasWarned: false,
  vite:config     info: [Function: info],
  vite:config     warn: [Function: warn],
  vite:config     warnOnce: [Function: warnOnce],
  vite:config     error: [Function: error],
  vite:config     clearScreen: [Function: clearScreen],
  vite:config     hasErrorLogged: [Function: hasErrorLogged]
  vite:config   },
  vite:config   packageCache: Map(0) { set: [Function (anonymous)] },
  vite:config   createResolver: [Function: createResolver],
  vite:config   optimizeDeps: {
  vite:config     esbuildOptions: { keepNames: undefined, preserveSymlinks: undefined }
  vite:config   }
  vite:config } +5ms
vite v2.8.0-beta.3 building for production...
✓ 3 modules transformed.
✓ 4 modules transformed.
dist/assets/favicon.17e50649.svg   1.49 KiB
dist/assets/worker.925df867.js     1.09 KiB
dist/index.html                    0.39 KiB
dist/assets/index.bcbde471.js      1.41 KiB / gzip: 0.58 KiB
```

</details>

### Generated assets

```sh
$ ls -1 dist/assets/
favicon.17e50649.svg
index.bcbde471.js
worker.925df867.js
```

### worker.925df867.js

```js
// ...(snip)...
console.log("Hello from worker.js");
__vitePreload(() => import("./myModule-494ef681.js"), true ? [] : void 0).then(() => {
  //                        ^^^^^^^^^^^^^^^^^^^^^^
  //                        this bundle is not generated.
  console.log("myModule.js was imported");
});
```

## Environment to reproduce

- vite: 2.8.0-beta.3
- node: v16.2.0

<details><summary>dependencies details</summary>

```sh
$ yarn list
├─ esbuild-android-arm64@0.14.3
├─ esbuild-darwin-64@0.14.3
├─ esbuild-darwin-arm64@0.14.3
├─ esbuild-freebsd-64@0.14.3
├─ esbuild-freebsd-arm64@0.14.3
├─ esbuild-linux-32@0.14.3
├─ esbuild-linux-64@0.14.3
├─ esbuild-linux-arm@0.14.3
├─ esbuild-linux-arm64@0.14.3
├─ esbuild-linux-mips64le@0.14.3
├─ esbuild-linux-ppc64le@0.14.3
├─ esbuild-netbsd-64@0.14.3
├─ esbuild-openbsd-64@0.14.3
├─ esbuild-sunos-64@0.14.3
├─ esbuild-windows-32@0.14.3
├─ esbuild-windows-64@0.14.3
├─ esbuild-windows-arm64@0.14.3
├─ esbuild@0.14.3
│  ├─ esbuild-android-arm64@0.14.3
│  ├─ esbuild-darwin-64@0.14.3
│  ├─ esbuild-darwin-arm64@0.14.3
│  ├─ esbuild-freebsd-64@0.14.3
│  ├─ esbuild-freebsd-arm64@0.14.3
│  ├─ esbuild-linux-32@0.14.3
│  ├─ esbuild-linux-64@0.14.3
│  ├─ esbuild-linux-arm@0.14.3
│  ├─ esbuild-linux-arm64@0.14.3
│  ├─ esbuild-linux-mips64le@0.14.3
│  ├─ esbuild-linux-ppc64le@0.14.3
│  ├─ esbuild-netbsd-64@0.14.3
│  ├─ esbuild-openbsd-64@0.14.3
│  ├─ esbuild-sunos-64@0.14.3
│  ├─ esbuild-windows-32@0.14.3
│  ├─ esbuild-windows-64@0.14.3
│  └─ esbuild-windows-arm64@0.14.3
├─ fsevents@2.3.2
├─ function-bind@1.1.1
├─ has@1.0.3
│  └─ function-bind@^1.1.1
├─ is-core-module@2.8.1
│  └─ has@^1.0.3
├─ nanoid@3.2.0
├─ path-parse@1.0.7
├─ picocolors@1.0.0
├─ postcss@8.4.5
│  ├─ nanoid@^3.1.30
│  ├─ picocolors@^1.0.0
│  └─ source-map-js@^1.0.1
├─ resolve@1.22.0
│  ├─ is-core-module@^2.8.1
│  ├─ path-parse@^1.0.7
│  └─ supports-preserve-symlinks-flag@^1.0.0
├─ rollup@2.66.1
│  └─ fsevents@~2.3.2
├─ source-map-js@1.0.2
├─ supports-preserve-symlinks-flag@1.0.0
└─ vite@2.8.0-beta.3
   ├─ esbuild@0.14.3
   ├─ fsevents@~2.3.2
   ├─ postcss@^8.4.5
   ├─ resolve@^1.20.0
   └─ rollup@^2.59.0
```

</details>

### System Info

```sh
npx envinfo --system --npmPackages '{vite,@vitejs/*}' --binaries --browsers
Need to install the following packages:
  envinfo
Ok to proceed? (y) y

  System:
    OS: macOS 10.15.7
    CPU: (16) x64 Intel(R) Core(TM) i9-9880H CPU @ 2.30GHz
    Memory: 1.01 GB / 32.00 GB
    Shell: 5.7.1 - /bin/zsh
  Binaries:
    Node: 16.2.0 - /private/var/tmp/fnm_multishells/72994_1643670772766/bin/node
    Yarn: 1.22.17 - /private/var/tmp/fnm_multishells/72994_1643670772766/bin/yarn
    npm: 7.13.0 - /private/var/tmp/fnm_multishells/72994_1643670772766/bin/npm
    Watchman: 2022.01.24.00 - /usr/local/bin/watchman
  Browsers:
    Chrome: 97.0.4692.99
    Firefox: 95.0.2
    Safari: 15.2
  npmPackages:
    vite: 2.8.0-beta.3 => 2.8.0-beta.3
```

##
