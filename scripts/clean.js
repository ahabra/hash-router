const buildUtils = require('./build.utils')
const Print = require('./console.utils').Print

const removed = buildUtils.clean()
Print.info('Removed directories: ' + removed.join(', '))
