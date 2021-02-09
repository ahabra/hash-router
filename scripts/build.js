const buildUtils = require('./build.utils')
const Print = require('./console.utils').Print

if (!buildUtils.checkNodeVersion(15)) {
  Print.error('Build failed.')
  process.exitCode = 1
  return
}

buildUtils.clean()
Print.info('Generate files to target/out/ ...')
buildUtils.copyIndexHtml()
const b1 = buildUtils.build({format: 'esm', external: [], fileNameSuffix: 'esm'})
const b2 = buildUtils.build({format: 'iife', external: [], fileNameSuffix: 'script'})
const b3 = buildUtils.build({format: 'iife', minify: true, external: [], fileNameSuffix: 'script-min'})


Promise.all([b1, b2, b3]).then( () => {
  Print.info('Copy files to dist/ ...')
  buildUtils.copyDist()
})
