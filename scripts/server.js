
const handler = require('serve-handler')
const http = require('http')
const buildUtils = require('./build.utils')
const Print = require('./console.utils').Print

const serverOptions = {
  public: 'target',
  cleanUrls: false
}

const port = 8800

function build(url) {
  if (!url || url.indexOf('.htm') > 0) {
    Print.extra('  rebuilding app ...')
    buildUtils.copyIndexHtml()
    buildUtils.build({format: 'iife', external: [], fileNameSuffix: 'script'})
  }
}

function createServer() {
  return http.createServer((request, response) => {
    Print.info(request.method + ' ' + request.url)
    build(request.url)
    return handler(request, response, serverOptions);
  })
}

build();

createServer().listen(port, () => {
  Print.help(`Running at http://localhost:${port}`);
});
