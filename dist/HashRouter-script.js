// HashRouter.js Library for hash-based routing.
// https://github.com/ahabra/hash-router
// Copyright 2021 (C) Abdul Habra. Version 0.2.3.
// Apache License Version 2.0


var HashRouter = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all2) => {
    for (var name in all2)
      __defProp(target, name, { get: all2[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/HashRouter.js
  var HashRouter_exports = {};
  __export(HashRouter_exports, {
    createRouter: () => createRouter
  });

  // node_modules/@techexp/jshelper/dist/helper-esm.js
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all2) => {
    for (var name in all2)
      __defProp2(target, name, { get: all2[name], enumerable: true });
  };
  var Domer_exports = {};
  __export2(Domer_exports, {
    add: () => add,
    all: () => all,
    classPresentIf: () => classPresentIf,
    createElement: () => createElement,
    createElements: () => createElements,
    first: () => first,
    getAttributes: () => getAttributes,
    id: () => id,
    removeElements: () => removeElements,
    setContent: () => setContent,
    tag: () => tag
  });
  var Objecter_exports = {};
  __export2(Objecter_exports, {
    equals: () => equals,
    forEachEntry: () => forEachEntry,
    has: () => has,
    isDate: () => isDate,
    isFunction: () => isFunction,
    isInteger: () => isInteger,
    isNil: () => isNil,
    isNumber: () => isNumber,
    isRegExp: () => isRegExp,
    isString: () => isString
  });
  function isNil(x) {
    return x === null || x === void 0;
  }
  function isString(s) {
    return isType(s, "String");
  }
  function isFunction(f) {
    return isType(f, "Function");
  }
  function isDate(d) {
    return isType(d, "Date");
  }
  function isNumber(n) {
    if (isType(n, "Number")) {
      if (Number.isNaN(n))
        return false;
      return Number.isFinite(n);
    }
    if (!isString(n))
      return false;
    n = n.trim();
    if (n === "")
      return false;
    return !isNaN(n);
  }
  function isInteger(n) {
    if (!isNumber(n))
      return false;
    return Number.isInteger(Number.parseFloat(n));
  }
  function isRegExp(re) {
    return isType(re, "RegExp");
  }
  function isType(v, type) {
    return Object.prototype.toString.call(v) === `[object ${type}]`;
  }
  function forEachEntry(object, func) {
    if (!object || !func)
      return;
    if (Array.isArray(object)) {
      object.forEach((v, index) => {
        func(index, v);
      });
      return;
    }
    Object.entries(object).forEach((p) => func(p[0], p[1]));
  }
  function has(object, propName) {
    if (!object || !propName)
      return false;
    return Object.prototype.hasOwnProperty.call(object, propName);
  }
  function equals(a, b) {
    if (a === b)
      return true;
    if (a === void 0 || b === void 0)
      return false;
    return isEqual(a, b);
  }
  function isEqual(a, b) {
    if (isSimpleType(a) || isSimpleType(b))
      return a === b;
    return isEqualCompoundType(a, b);
  }
  var simpleTypes = /* @__PURE__ */ new Set(["boolean", "number", "bigint", "string", "symbol"]);
  function isSimpleType(v) {
    return simpleTypes.has(typeof v);
  }
  function isEqualCompoundType(a, b) {
    if (!isEqualType(a, b))
      return false;
    if (isEqualDates(a, b))
      return true;
    return isEqualObjects(a, b);
  }
  function isEqualType(a, b) {
    return prototypeToString(a) === prototypeToString(b);
  }
  function prototypeToString(v) {
    return Object.prototype.toString.call(v);
  }
  function isEqualDates(a, b) {
    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }
    return false;
  }
  function isEqualObjects(a, b) {
    const akeys = Object.keys(a);
    if (akeys.length !== Object.keys(b).length)
      return false;
    return akeys.every((k) => equals(a[k], b[k]));
  }
  function id(elementId, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    return root.getElementById(elementId);
  }
  function all(selector, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    return Array.from(root.querySelectorAll(selector));
  }
  function first(selector, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    if (!selector.includes("/")) {
      return root.querySelector(selector);
    }
    const path = selector.split("/").map((p) => p.trim()).filter((p) => p.length > 0);
    for (const p of path) {
      root = nextChild(p, root);
      if (root === null)
        break;
    }
    return root;
  }
  function nextChild(pathItem, root) {
    const isShadowRoot = pathItem === "shadowRoot" || pathItem === "shadow-root";
    return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem);
  }
  function isWebComponent(el) {
    return el && el.shadowRoot && el.tagName.includes("-");
  }
  function getAttributes(el) {
    const result = {};
    const atts = el.attributes;
    if (!atts || atts.length === 0)
      return result;
    for (let i = 0; i < atts.length; i++) {
      const a = atts[i];
      result[a.name] = a.value;
    }
    return result;
  }
  function createElements(html = "") {
    html = html.trim();
    if (!html)
      return [];
    const temp = document.createElement("template");
    temp.innerHTML = html;
    return Array.from(temp.content.childNodes);
  }
  function createElement(name, attributes = {}, content = "") {
    const html = tag(name, attributes, content);
    const elements = createElements(html);
    if (elements.length === 0)
      return null;
    return elements[0];
  }
  function tag(name, attributes = {}, content = "") {
    if (!name)
      return "";
    const atts = attsToString(attributes);
    return `<${name}${atts}>${content}</${name}>`;
  }
  function attsToString(attributes) {
    const array = [];
    forEachEntry(attributes, (k, v) => {
      array.push(`${k}="${v}"`);
    });
    const sep = array.length > 0 ? " " : "";
    return sep + array.join(" ");
  }
  var LOCATIONS = /* @__PURE__ */ new Set(["beforebegin", "afterbegin", "beforeend", "afterend"]);
  function add(target, tobeAdded, location = "beforeend") {
    location = location.toLowerCase();
    if (!LOCATIONS.has(location))
      return false;
    if (isString(tobeAdded)) {
      target.insertAdjacentHTML(location, tobeAdded);
    } else {
      addElements(target, tobeAdded, location);
    }
    return true;
  }
  function addElements(target, tobeAdded, location) {
    if (Array.isArray(tobeAdded)) {
      tobeAdded.forEach((el) => target.insertAdjacentElement(location, el));
    } else {
      target.insertAdjacentElement(location, tobeAdded);
    }
  }
  function setContent(element, ...content) {
    element.innerHTML = "";
    element.append(...content);
  }
  function removeElements(selector, root = document) {
    const elements = all(selector, root);
    elements.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }
  function classPresentIf(el, cssClass, condition) {
    if (!el)
      return;
    const func = condition ? "add" : "remove";
    el.classList[func](cssClass);
  }
  var Stringer_exports = {};
  __export2(Stringer_exports, {
    endsWith: () => endsWith,
    indexOf: () => indexOf,
    indexOfFirstMatch: () => indexOfFirstMatch,
    indexOfLastMatch: () => indexOfLastMatch,
    isEmpty: () => isEmpty,
    removePrefix: () => removePrefix,
    removeSuffix: () => removeSuffix,
    removeSurrounding: () => removeSurrounding,
    replaceAll: () => replaceAll,
    replaceTemplate: () => replaceTemplate,
    startsWith: () => startsWith,
    strip: () => strip,
    stripEnd: () => stripEnd,
    stripStart: () => stripStart,
    substringAfter: () => substringAfter,
    substringBefore: () => substringBefore,
    trim: () => trim
  });
  function indexOf(st, search, fromIndex = 0, ignoreCase = false) {
    if (!st)
      return -1;
    if (ignoreCase) {
      return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
    }
    return st.indexOf(search, fromIndex);
  }
  function indexOfFirstMatch(st, callback) {
    if (!callback || !st)
      return -1;
    return st.split("").findIndex(callback);
  }
  function indexOfLastMatch(st, callback) {
    if (!callback || !st)
      return -1;
    const chars = st.split("");
    for (let i = chars.length; i >= 0; --i) {
      if (callback(chars[i], i))
        return i;
    }
    return -1;
  }
  function startsWith(st = "", search = void 0, ignoreCase = false) {
    if (ignoreCase) {
      const start = st.substring(0, search.length).toLowerCase();
      return search.toLowerCase() === start;
    }
    return st.startsWith(search);
  }
  function endsWith(st, search, ignoreCase = false) {
    if (ignoreCase) {
      return st.toLowerCase().endsWith(search.toLowerCase());
    }
    return st.endsWith(search);
  }
  function removePrefix(st, prefix, ignoreCase = false) {
    if (startsWith(st, prefix, ignoreCase)) {
      st = st.substring(prefix.length);
    }
    return st;
  }
  function removeSuffix(st, suffix, ignoreCase = false) {
    if (endsWith(st, suffix, ignoreCase)) {
      st = st.substring(0, st.length - suffix.length);
    }
    return st;
  }
  function removeSurrounding(st, prefix, suffix, ignoreCase = false) {
    return removeSuffix(removePrefix(st, prefix, ignoreCase), suffix, ignoreCase);
  }
  function substringAfter(st, search, ignoreCase = false) {
    if (!search) {
      return st;
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return "";
    return st.substring(i + search.length);
  }
  function substringBefore(st, search, ignoreCase = false) {
    if (!search) {
      return "";
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return st;
    return st.substring(0, i);
  }
  function trim(s) {
    if (isEmpty(s))
      return "";
    if (!isString(s)) {
      s = String(s);
    }
    return s.trim(s);
  }
  function isEmpty(s) {
    return s === void 0 || s === null || s === "";
  }
  function replaceAll(text, search, newStr) {
    if (isFunction(String.prototype.replaceAll)) {
      return text.replaceAll(search, newStr);
    }
    if (isRegExp(search)) {
      return text.replace(search, newStr);
    }
    const re = new RegExp(search, "g");
    return text.replace(re, newStr);
  }
  function replaceTemplate(text = "", values = {}, preTag = "${", postTag = "}") {
    forEachEntry(values, (k, v) => {
      if (v !== void 0) {
        k = preTag + k + postTag;
        text = replaceAll(text, k, v);
      }
    });
    return text;
  }
  function stripStart(s, stripChars = "") {
    if (isEmpty(s))
      return "";
    if (!stripChars)
      return s;
    return stripStart_(s, new Set(Array.from(stripChars)));
  }
  function stripStart_(s, stripSet) {
    for (let i = 0; i < s.length; i++) {
      if (!stripSet.has(s.charAt(i))) {
        return s.substring(i);
      }
    }
    return "";
  }
  function stripEnd(s, stripChars = "") {
    if (isEmpty(s))
      return "";
    if (!stripChars)
      return s;
    return stripEnd_(s, new Set(Array.from(stripChars)));
  }
  function stripEnd_(s, stripSet) {
    for (let i = s.length - 1; i >= 0; i--) {
      if (!stripSet.has(s.charAt(i))) {
        return s.substring(0, i + 1);
      }
    }
    return "";
  }
  function strip(s, stripChars = "") {
    if (s === void 0 || s === "")
      return "";
    if (!stripChars)
      return s;
    const stripSet = new Set(Array.from(stripChars));
    s = stripStart_(s, stripSet);
    if (!s)
      return "";
    return stripEnd_(s, stripSet);
  }
  var LineCompare_exports = {};
  __export2(LineCompare_exports, {
    compareLines: () => compareLines
  });
  function compareLines(t1, t2, { trim: trim2 = true, skipEmpty = true, caseSensitive = true } = { trim: true, skipEmpty: true, caseSensitive: true }) {
    t1 = toLines(t1, { trim: trim2, skipEmpty });
    t2 = toLines(t2, { trim: trim2, skipEmpty });
    if (t1.length !== t2.length) {
      return `t1 has ${t1.length} lines(s) while t2 has ${t2.length} line(s).`;
    }
    for (let i = 0; i < t1.length; i++) {
      const result = compareTwoLines(t1[i], t2[i], i, caseSensitive);
      if (result.length > 0) {
        return result;
      }
    }
    return "";
  }
  function compareTwoLines(t1, t2, index, caseSensitive) {
    const a = caseSensitive ? t1 : t1.toLowerCase();
    const b = caseSensitive ? t2 : t2.toLowerCase();
    if (a !== b) {
      return `Line #${index + 1} mismatch.
${t1}
${t2}`;
    }
    return "";
  }
  function toLines(t, { trim: trim2, skipEmpty }) {
    if (trim2) {
      t = trim(t);
    }
    t = t.split("\n");
    if (trim2) {
      t = t.map((ln) => trim(ln));
    }
    if (skipEmpty) {
      t = t.filter((ln) => !!ln);
    }
    return t;
  }

  // src/utils/RouterUtils.js
  function getHashPath(href) {
    href = Stringer_exports.substringAfter(href, "#");
    return cleanPath(href);
  }
  function cleanPath(path) {
    return Stringer_exports.strip(path, " /#");
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
      return { type: "param", value: part.substring(1) };
    }
    if (part.startsWith("[") && part.endsWith("]")) {
      const value = part.substring(1, part.length - 1);
      return { type: "regex", value: new RegExp(value) };
    }
    return { type: "string", value: part };
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
      this.routes.push({ route: new Route(path), handler });
    }
    go(hashPath) {
      hashPath = "#" + cleanPath(hashPath);
      const base = Stringer_exports.substringBefore(window.location.href, "#");
      const href = base + hashPath;
      window.history.pushState(null, null, hashPath);
      window.location.href = href;
    }
  };
  function hashChangeHandler(ev, routes, isLoad = false) {
    const newPath = getNewPath(ev, isLoad);
    if (newPath === void 0)
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
    return oldPath === newPath ? void 0 : newPath;
  }
  function findHandler(routes, path, params) {
    const found = routes.find((r) => r.route.isMatch(path, params));
    return found ? found.handler : false;
  }
  return __toCommonJS(HashRouter_exports);
})();
//# sourceMappingURL=HashRouter-script.js.map
