import * as buildUtils from './build.utils.mjs'
import {Print} from './console.utils.mjs'

const removed = buildUtils.clean()
Print.info('Removed directories: ' + removed.join(', '))
