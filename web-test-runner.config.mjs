import { puppeteerLauncher } from '@web/test-runner-puppeteer'

export default {
  files: ['src/**/*.test.js'],
  concurrency: 10,
  nodeResolve: true,
  browsers: [puppeteerLauncher()],
  coverage: true,
  coverageConfig: {
    reportDir: 'target/coverage'
  }
}
