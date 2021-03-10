// HashRouter.js Library for hash-based routing.
// https://github.com/ahabra/hash-router
// Copyright 2021 (C) Abdul Habra. Version 0.1.2.
// Apache License Version 2.0


var HashRouter=(()=>{var W=Object.defineProperty;var q=(t,e)=>{for(var n in e)W(t,n,{get:e[n],enumerable:!0})};var pt={};q(pt,{createRouter:()=>A});var H=Object.defineProperty,a=(t,e)=>{for(var n in e)H(t,n,{get:e[n],enumerable:!0})},$={};a($,{add:()=>B,all:()=>w,classPresentIf:()=>z,createElement:()=>N,createElements:()=>v,first:()=>D,getAttributes:()=>F,id:()=>_,removeElements:()=>I,setContent:()=>U,tag:()=>E});var k={};a(k,{equals:()=>S,forEachEntry:()=>h,has:()=>K,isDate:()=>l,isFunction:()=>J,isNil:()=>G,isString:()=>c});function G(t){return t==null}function c(t){return d(t,"String")}function J(t){return d(t,"Function")}function l(t){return d(t,"Date")}function d(t,e){return Object.prototype.toString.call(t)===`[object ${e}]`}function h(t,e){if(!(!t||!e)){if(Array.isArray(t)){t.forEach((n,r)=>{e(r,n)});return}Object.entries(t).forEach(n=>e(n[0],n[1]))}}function K(t,e){return!t||!e?!1:Object.prototype.hasOwnProperty.call(t,e)}function S(t,e){return t===e?!0:t===void 0||e===void 0?!1:Q(t,e)}function Q(t,e){return b(t)||b(e)?t===e:V(t,e)}var X=new Set(["boolean","number","bigint","string","symbol"]);function b(t){return X.has(typeof t)}function V(t,e){return Y(t,e)?Z(t,e)?!0:tt(t,e):!1}function Y(t,e){return x(t)===x(e)}function x(t){return Object.prototype.toString.call(t)}function Z(t,e){return l(t)&&l(e)?t.getTime()===e.getTime():!1}function tt(t,e){let n=Object.keys(t);return n.length!==Object.keys(e).length?!1:n.every(r=>S(t[r],e[r]))}function _(t,e=document){return g(e)&&(e=e.shadowRoot),e.getElementById(t)}function w(t,e=document){return g(e)&&(e=e.shadowRoot),Array.from(e.querySelectorAll(t))}function D(t,e=document){if(g(e)&&(e=e.shadowRoot),!t.includes("/"))return e.querySelector(t);let n=t.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(e=et(r,e),e===null)break;return e}function et(t,e){return t==="shadowRoot"||t==="shadow-root"?e.shadowRoot:e.querySelector(t)}function g(t){return t&&t.shadowRoot&&t.tagName.includes("-")}function F(t){let e={},n=t.attributes;if(!n||n.length===0)return e;for(let r=0;r<n.length;r++){let i=n[r];e[i.name]=i.value}return e}function v(t=""){if(t=t.trim(),!t)return[];let e=document.createElement("template");return e.innerHTML=t,Array.from(e.content.childNodes)}function N(t,e={},n=""){let r=E(t,e,n),i=v(r);return i.length===0?null:i[0]}function E(t,e={},n=""){if(!t)return"";let r=nt(e);return`<${t}${r}>${n}</${t}>`}function nt(t){let e=[];return h(t,(r,i)=>{e.push(`${r}="${i}"`)}),(e.length>0?" ":"")+e.join(" ")}var rt=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function B(t,e,n="beforeend"){return n=n.toLowerCase(),rt.has(n)?(c(e)?t.insertAdjacentHTML(n,e):it(t,e,n),!0):!1}function it(t,e,n){Array.isArray(e)?e.forEach(r=>t.insertAdjacentElement(n,r)):t.insertAdjacentElement(n,e)}function U(t,...e){t.innerHTML="",t.append(...e)}function I(t,e=document){w(t,e).forEach(r=>{r.parentNode.removeChild(r)})}function z(t,e,n){if(!t)return;let r=n?"add":"remove";t.classList[r](e)}var s={};a(s,{endsWith:()=>L,indexOf:()=>p,indexOfFirstMatch:()=>ut,indexOfLastMatch:()=>st,isEmpty:()=>T,removePrefix:()=>P,removeSuffix:()=>R,removeSurrounding:()=>ot,replaceTemplate:()=>lt,startsWith:()=>O,substringAfter:()=>ft,substringBefore:()=>at,trim:()=>ct});function p(t,e,n=0,r=!1){return t?r?t.toLowerCase().indexOf(e.toLowerCase(),n):t.indexOf(e,n):-1}function ut(t,e){return!e||!t?-1:t.split("").findIndex(e)}function st(t,e){if(!e||!t)return-1;let n=t.split("");for(let r=n.length;r>=0;--r)if(e(n[r],r))return r;return-1}function O(t="",e=void 0,n=!1){if(n){let r=t.substring(0,e.length).toLowerCase();return e.toLowerCase()===r}return t.startsWith(e)}function L(t,e,n=!1){return n?t.toLowerCase().endsWith(e.toLowerCase()):t.endsWith(e)}function P(t,e,n=!1){return O(t,e,n)&&(t=t.substring(e.length)),t}function R(t,e,n=!1){return L(t,e,n)&&(t=t.substring(0,t.length-e.length)),t}function ot(t,e,n,r=!1){return R(P(t,e,r),n,r)}function ft(t,e,n=!1){if(!e)return t;let r=p(t,e,0,n);return r<0?"":t.substring(r+e.length)}function at(t,e,n=!1){if(!e)return"";let r=p(t,e,0,n);return r<0?t:t.substring(0,r)}function ct(t){return T(t)?"":(c(t)||(t=String(t)),t.trim(t))}function T(t){return t==null||t===""}function lt(t="",e={},n="${",r="}"){return h(e,(i,u)=>{u!==void 0&&(i=n+i+r,t=t.replaceAll(i,u))}),t}function f(t){return t=s.substringAfter(t,"#"),o(t)}function o(t){let e=i=>i!=="/"&&i!=="#",n=s.indexOfFirstMatch(t,e),r=s.indexOfLastMatch(t,e);return t.substring(n,r)}var m=class{constructor(e){this.parts=ht(e)}isMatch(e,n={}){let r=C(e);if(this.parts.length!==r.length)return!1;for(let i=0;i<r.length;i++){let u=this.parts[i],y=r[i];if(!dt(u,y))return!1;u.type==="param"&&(n[u.value]=y)}return!0}};function ht(t){return C(t).map(e=>gt(e))}function C(t){return o(t).split("/").map(e=>e.trim()).filter(e=>e.length>0)}function gt(t){if(t.startsWith(":"))return{type:"param",value:t.substring(1)};if(t.startsWith("[")&&t.endsWith("]")){let e=t.substring(1,t.length-1);return{type:"regex",value:new RegExp(e)}}return{type:"string",value:t}}function dt(t,e){return t.type==="param"?!0:t.type==="string"?e===t.value:t.type==="regex"?t.value.test(e):!1}function A(){return new j}var j=class{constructor(){this.routes=[];let e=r=>M(r,this.routes),n=r=>M(r,this.routes,!0);window.addEventListener("hashchange",e,!1),window.addEventListener("load",n,!1)}add(e,n){this.routes.push({route:new m(e),handler:n})}go(e){e="#"+o(e);let r=s.substringBefore(window.location.href,"#")+e;window.history.pushState(null,null,e),window.location.href=r}};function M(t,e,n=!1){let r=mt(t,n);if(!r)return;let i={},u=yt(e,r,i);u&&u(r,i)}function mt(t,e){if(e)return f(t.target.location.href);let n=f(t.oldURL),r=f(t.newURL);return n===r?"":r}function yt(t,e,n){let r=t.find(i=>i.route.isMatch(e,n));return r?r.handler:!1}return pt;})();
