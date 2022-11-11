import * as buildUtils from './build.utils.mjs'
import { Print } from './console.utils.mjs'

if (!buildUtils.checkNodeVersion(15)) {
  Print.error('Build failed.')
  process.exit(1)
}

buildUtils.clean()
Print.info('Generate files to target/out/ ...')
buildUtils.copyIndexHtml()
const b1 = buildUtils.build({format: 'esm', external: ['@techexp/jshelper'], fileNameSuffix: 'esm'})
const b2 = buildUtils.build({format: 'iife', external: [], fileNameSuffix: 'script'})
const b3 = buildUtils.build({format: 'iife', minify: true, external: [], fileNameSuffix: 'script-min'})


Promise.all([b1, b2, b3]).then( () => {
  Print.info('Copy files to dist/ ...')
  buildUtils.copyDist()
})
