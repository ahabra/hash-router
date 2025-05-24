# HashRouter.js

A library for hash-based routing in the browser.

## Introduction
In a Single Page App (SPA), it is convenient to _navigate_ by changing the part of the URL after the hash `#` character,
as this will not cause the browser to reload the page.

This library allows you to associate _callbacks_ with URL paths after the hash, so when a user navigates to a
given path, the associated callback is called.

The size of this library, minified and zipped is about 1KB.

## Install
You can use this library as either an EcmaScript module, or the old way as a script which you include in your html file.

### Install as NPM EcmaScript Module
If you plan to use this package as an NPM module:

```bash
    npm install @techexp/hash-router
```

### Install as a Script
If you plan to use this package as a JS script library

```html
    <script src="https://raw.githubusercontent.com/ahabra/hash-router/master/dist/HashRouter-script-min.js"></script>
```

Alternatively, you can download the file `https://raw.githubusercontent.com/ahabra/hash-router/master/dist/HashRouter-script-min.js`
and use directly. Note that there is a non-minified version at the same location.

## Usage
If you installed as an EcmaScript module
```js
import * as HashRouter from '@techexp/hash-router'
```

If you installed as a Script, the library is available at `window.HashRouter`

### Quick Code Demo
This example shows how to create simple hash-based route handlers:

```js
import * as HashRouter from '@techexp/hash-router'
// or use window.HashRouter if you are using the script.

const router = HashRouter.createRouter()

router.add('a/b', ()=> {
  console.log('Navigated to #a/b')
})
window.location.href = '#a/b'

router.add('a/:id/c', (path, params) => {
  console.log('Navigated to ', path)  // path = a/42/c
  console.log(params) // params = {id: "42"}
})
window.location.href = '#a/42/c'

router.add('a/[x.*z]/c', path => {
  console.log('Navigated to ', path)  // path = a/xBARz/c
})
window.location.href = '#a/xBARz/c'
```

### API
This library consists of a single function `createRouter()` that returns an object with two prototype methods, `add()` and `go()`.

#### `add(path, handler)`
Add a new hash-path handler.

##### `path`
A string that consists of one or more slash `/` separated parts.
The path may start with a hash or slash, but they have no effect.
Each part can be one of:
1. Literal string value. E.g. `dept`
2. Parameter prefixed with colon `:`. E.g. `dept/:id`
3. Regular Expression surrounded by square brackets `[]`. E.g. `dept/:id/[foo.*]`

##### `handler`
A callback that takes two arguments, `path` and `params`.
`path` is the current path that was navigated to, while `params` is an object that contain the path parameters. For example:

```js
router.add('dept/:id/employee/:name', (path, params) => {
  consol.log('id', params.id)  // 3
  consol.log('name', params.name)   // bob
})

window.location.href = '#dept/3/employee/bob'
```

#### `go(path)`
Navigate (within the app) to the given path.
The path may start with a hash or slash, but they have no effect.

##### `path`
The path to navigate to. For example:

```js
router.go('dept/3/employee/bob')
```

Calling this functions is somewhat similar to setting `window.location.href`, however this `go()` function makes
sure that a hash character will be used, and it updates the browser's history.