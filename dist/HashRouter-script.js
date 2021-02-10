// HashRouter.js Library for hash-based routing.
// https://github.com/ahabra/hash-router
// Copyright 2021 (C) Abdul Habra. Version 0.1.1.
// Apache License Version 2.0


var HashRouter = (() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // src/HashRouter.js
  var HashRouter_exports = {};
  __export(HashRouter_exports, {
    createRouter: () => createRouter
  });

  // src/utils/StringUtils.js
  function indexOf(st, search, fromIndex, ignoreCase) {
    if (!st)
      return -1;
    if (ignoreCase) {
      return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
    }
    return st.indexOf(search, fromIndex);
  }
  function firstCharIndex(st, cb) {
    if (!cb || !st)
      return -1;
    return st.split("").findIndex(cb);
  }
  function lastCharIndex(st, cb) {
    if (!cb || !st)
      return -1;
    const chars = st.split("");
    for (let i = chars.length; i >= 0; --i) {
      if (cb(chars[i]))
        return i;
    }
    return -1;
  }
  function substringAfter(st, search, ignoreCase) {
    if (!search) {
      return st;
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return "";
    return st.substring(i + search.length);
  }
  function substringBefore(st, search, ignoreCase) {
    if (!search) {
      return "";
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return st;
    return st.substring(0, i);
  }

  // src/utils/RouterUtils.js
  function getHashPath(href) {
    href = substringAfter(href, "#");
    return cleanPath(href);
  }
  function cleanPath(path) {
    const cb = (c) => c !== "/" && c !== "#";
    const start = firstCharIndex(path, cb);
    const end = lastCharIndex(path, cb);
    return path.substring(start, end);
  }

  // src/utils/Route.js
  var Route = class {
    constructor(path) {
      this.parts = parsePath(path);
    }
    isMatch(path, params = {}) {
      const pathItems = tokenizePath(path);
      if (this.parts.length !== pathItems.length)
        return false;
      for (let i = 0; i < pathItems.length; i++) {
        const part = this.parts[i];
        const item = pathItems[i];
        if (!isPartMatch(part, item))
          return false;
        if (part.type === "param") {
          params[part.value] = item;
        }
      }
      return true;
    }
  };
  function parsePath(path) {
    return tokenizePath(path).map((p) => parsePart(p));
  }
  function tokenizePath(path) {
    return cleanPath(path).split("/").map((p) => p.trim()).filter((p) => p.length > 0);
  }
  function parsePart(part) {
    if (part.startsWith(":")) {
      return {type: "param", value: part.substring(1)};
    }
    if (part.startsWith("[") && part.endsWith("]")) {
      const value = part.substring(1, part.length - 1);
      return {type: "regex", value: new RegExp(value)};
    }
    return {type: "string", value: part};
  }
  function isPartMatch(part, s) {
    if (part.type === "param")
      return true;
    if (part.type === "string")
      return s === part.value;
    if (part.type === "regex")
      return part.value.test(s);
    return false;
  }

  // src/HashRouter.js
  function createRouter() {
    return new HashRouter();
  }
  var HashRouter = class {
    constructor() {
      this.routes = [];
      const hashHandler = (ev) => hashChangeHandler(ev, this.routes);
      const loadHandler = (ev) => hashChangeHandler(ev, this.routes, true);
      window.addEventListener("hashchange", hashHandler, false);
      window.addEventListener("load", loadHandler, false);
    }
    add(path, handler) {
      this.routes.push({route: new Route(path), handler});
    }
    go(hashPath) {
      hashPath = "#" + cleanPath(hashPath);
      const base = substringBefore(window.location.href, "#");
      const href = base + hashPath;
      window.history.pushState(null, null, hashPath);
      window.location.href = href;
    }
  };
  function hashChangeHandler(ev, routes, isLoad = false) {
    const newPath = getNewPath(ev, isLoad);
    if (!newPath)
      return;
    const params = {};
    const handler = findHandler(routes, newPath, params);
    if (handler) {
      handler(newPath, params);
    }
  }
  function getNewPath(ev, isLoad) {
    if (isLoad) {
      return getHashPath(ev.target.location.href);
    }
    const oldPath = getHashPath(ev.oldURL);
    const newPath = getHashPath(ev.newURL);
    return oldPath === newPath ? "" : newPath;
  }
  function findHandler(routes, path, params) {
    const found = routes.find((r) => r.route.isMatch(path, params));
    return found ? found.handler : false;
  }
  return HashRouter_exports;
})();
