/** Utilities used by both build.js and server.js */

import fs from 'fs-extra'
import esbuild from 'esbuild'
import { Print } from './console.utils.mjs'

const target = 'target'
const out = `${target}/out`
const dist = 'dist'
const banner = {
  js: `// HashRouter.js Library for hash-based routing.
// https://github.com/ahabra/hash-router
// Copyright 2021 (C) Abdul Habra. Version ${process.env.npm_package_version}.
// Apache License Version 2.0

`
}

export function clean() {
  fs.rmSync(target, { recursive: true, force: true})
  fs.rmSync(dist, { recursive: true, force: true})
  return [target, dist]
}

export function copyIndexHtml() {
  let html = fs.readFileSync('src/index.html', {encoding: 'utf8'})
  html = html.replace('<script data-app></script>', '<script data-app src="out/HashRouter-script.js"></script>')
  fs.mkdirSync(target, {recursive: true})
  fs.writeFileSync(`${target}/index.html`, html)
}

export function build({format, minify, external, fileNameSuffix}) {
  const buildOptions = {
    entryPoints: ['src/HashRouter.js'],
    bundle: true,
    sourcemap: true,
    banner,
    outfile: `${out}/HashRouter-${fileNameSuffix}.js`,
    minify: !!minify,
    format,
    external,
    globalName: 'HashRouter'
  };

  const promise = esbuild.build(buildOptions)
  promise.catch(() => process.exit(1))
  return promise
}

export function copyDist() {
  fs.copySync(out, dist)
}

export function nodeVersion() {
  let v = process.versions.node.split('.')
  if (v.length < 3) {
    v.unshift('0')
  }
  v = v.map(p => parseInt(p, 10))
  return {
    major: v[0],
    minor: v[1],
    patch: v[2]
  }
}

export function checkNodeVersion(majorMinimum) {
  const version = nodeVersion()
  if (version.major < majorMinimum) {
    Print.error(`Invalid node version. You have ${version.major}. Require ${majorMinimum}.`)
    return false
  }
  return true
}
