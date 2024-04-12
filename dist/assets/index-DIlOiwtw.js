var P=Object.defineProperty;var q=(i,t,e)=>t in i?P(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var C=(i,t,e)=>(q(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=e(n);fetch(n.href,l)}})();function Q(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var R={exports:{}};R.exports;(function(i){var t=function(){var e=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",l={};function s(o,d){if(!l[o]){l[o]={};for(var u=0;u<o.length;u++)l[o][o.charAt(u)]=u}return l[o][d]}var a={compressToBase64:function(o){if(o==null)return"";var d=a._compress(o,6,function(u){return r.charAt(u)});switch(d.length%4){default:case 0:return d;case 1:return d+"===";case 2:return d+"==";case 3:return d+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:a._decompress(o.length,32,function(d){return s(r,o.charAt(d))})},compressToUTF16:function(o){return o==null?"":a._compress(o,15,function(d){return e(d+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:a._decompress(o.length,16384,function(d){return o.charCodeAt(d)-32})},compressToUint8Array:function(o){for(var d=a.compress(o),u=new Uint8Array(d.length*2),c=0,h=d.length;c<h;c++){var v=d.charCodeAt(c);u[c*2]=v>>>8,u[c*2+1]=v%256}return u},decompressFromUint8Array:function(o){if(o==null)return a.decompress(o);for(var d=new Array(o.length/2),u=0,c=d.length;u<c;u++)d[u]=o[u*2]*256+o[u*2+1];var h=[];return d.forEach(function(v){h.push(e(v))}),a.decompress(h.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":a._compress(o,6,function(d){return n.charAt(d)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),a._decompress(o.length,32,function(d){return s(n,o.charAt(d))}))},compress:function(o){return a._compress(o,16,function(d){return e(d)})},_compress:function(o,d,u){if(o==null)return"";var c,h,v={},b={},S="",k="",y="",E=2,w=3,g=2,A=[],f=0,p=0,m;for(m=0;m<o.length;m+=1)if(S=o.charAt(m),Object.prototype.hasOwnProperty.call(v,S)||(v[S]=w++,b[S]=!0),k=y+S,Object.prototype.hasOwnProperty.call(v,k))y=k;else{if(Object.prototype.hasOwnProperty.call(b,y)){if(y.charCodeAt(0)<256){for(c=0;c<g;c++)f=f<<1,p==d-1?(p=0,A.push(u(f)),f=0):p++;for(h=y.charCodeAt(0),c=0;c<8;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1}else{for(h=1,c=0;c<g;c++)f=f<<1|h,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=0;for(h=y.charCodeAt(0),c=0;c<16;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1}E--,E==0&&(E=Math.pow(2,g),g++),delete b[y]}else for(h=v[y],c=0;c<g;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1;E--,E==0&&(E=Math.pow(2,g),g++),v[k]=w++,y=String(S)}if(y!==""){if(Object.prototype.hasOwnProperty.call(b,y)){if(y.charCodeAt(0)<256){for(c=0;c<g;c++)f=f<<1,p==d-1?(p=0,A.push(u(f)),f=0):p++;for(h=y.charCodeAt(0),c=0;c<8;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1}else{for(h=1,c=0;c<g;c++)f=f<<1|h,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=0;for(h=y.charCodeAt(0),c=0;c<16;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1}E--,E==0&&(E=Math.pow(2,g),g++),delete b[y]}else for(h=v[y],c=0;c<g;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1;E--,E==0&&(E=Math.pow(2,g),g++)}for(h=2,c=0;c<g;c++)f=f<<1|h&1,p==d-1?(p=0,A.push(u(f)),f=0):p++,h=h>>1;for(;;)if(f=f<<1,p==d-1){A.push(u(f));break}else p++;return A.join("")},decompress:function(o){return o==null?"":o==""?null:a._decompress(o.length,32768,function(d){return o.charCodeAt(d)})},_decompress:function(o,d,u){var c=[],h=4,v=4,b=3,S="",k=[],y,E,w,g,A,f,p,m={val:u(0),position:d,index:1};for(y=0;y<3;y+=1)c[y]=y;for(w=0,A=Math.pow(2,2),f=1;f!=A;)g=m.val&m.position,m.position>>=1,m.position==0&&(m.position=d,m.val=u(m.index++)),w|=(g>0?1:0)*f,f<<=1;switch(w){case 0:for(w=0,A=Math.pow(2,8),f=1;f!=A;)g=m.val&m.position,m.position>>=1,m.position==0&&(m.position=d,m.val=u(m.index++)),w|=(g>0?1:0)*f,f<<=1;p=e(w);break;case 1:for(w=0,A=Math.pow(2,16),f=1;f!=A;)g=m.val&m.position,m.position>>=1,m.position==0&&(m.position=d,m.val=u(m.index++)),w|=(g>0?1:0)*f,f<<=1;p=e(w);break;case 2:return""}for(c[3]=p,E=p,k.push(p);;){if(m.index>o)return"";for(w=0,A=Math.pow(2,b),f=1;f!=A;)g=m.val&m.position,m.position>>=1,m.position==0&&(m.position=d,m.val=u(m.index++)),w|=(g>0?1:0)*f,f<<=1;switch(p=w){case 0:for(w=0,A=Math.pow(2,8),f=1;f!=A;)g=m.val&m.position,m.position>>=1,m.position==0&&(m.position=d,m.val=u(m.index++)),w|=(g>0?1:0)*f,f<<=1;c[v++]=e(w),p=v-1,h--;break;case 1:for(w=0,A=Math.pow(2,16),f=1;f!=A;)g=m.val&m.position,m.position>>=1,m.position==0&&(m.position=d,m.val=u(m.index++)),w|=(g>0?1:0)*f,f<<=1;c[v++]=e(w),p=v-1,h--;break;case 2:return k.join("")}if(h==0&&(h=Math.pow(2,b),b++),c[p])S=c[p];else if(p===v)S=E+E.charAt(0);else return null;k.push(S),c[v++]=E+S.charAt(0),h--,E=S,h==0&&(h=Math.pow(2,b),b++)}}};return a}();i!=null?i.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(R);var N=R.exports;const O=i=>Array.from(i).map(t=>String.fromCharCode(t)).join("");function Y(i,t){const e=Array.from(i);e.shift();const r=e.shift(),n=O(e.splice(0,r)),l=t.createDirectory(n),s=(()=>{const a=e.shift(),o=e.shift(),d=a.toString(16)+o.toString(16);return parseInt(d,16)})();for(let a=0;a<s;a++){const o=e[a];if(o==1){const d=e[a+1],u=O(e.slice(a+2,a+2+d)),c=e[a+2+d],h=O(e.slice(a+3+d,a+3+d+c));l.createFile(u,h);const v=3+d+c;a+=v,a--}if(o==2){const d=Y(new Uint8Array(e.splice(a)),l);a+=d,a--}}return s}function X(i){const e=typeof i=="string"?N.decompress(i).split(",").map(n=>parseInt(n)):i,r=new z;return Y(new Uint8Array(e),r.root),r.root=r.root.get()[0],r.root.parentDir=void 0,r}class M extends Error{}class U extends Error{}class H extends Error{}class I extends Error{}class j extends Error{}class F{constructor(t,e,r){C(this,"name");C(this,"parentDir");C(this,"contents");C(this,"type","file");if(this.name=t,typeof e=="string"){if(e.split("").map(n=>n.charCodeAt(0)).some(n=>n>255))throw new j;e=new Uint8Array(e.split("").map(n=>n.charCodeAt(0)))}if(e.length>255)throw new I;this.contents=e||new Uint8Array,this.parentDir=r}delete(){if(this.parentDir)this.parentDir.delete(this.name);else throw new U("No parent provided when creating file")}rename(t){if(!this.parentDir)throw new U("No parent provided, or root directory");this.parentDir.rename(this.name,t)}write(t){if(t.length>255)throw new I;if(typeof t=="string"&&t.split("").map(e=>e.charCodeAt(0)).some(e=>e>255))throw new j;this.contents=typeof t=="string"?new Uint8Array(t.split("").map(e=>e.charCodeAt(0))):t}read(){return new TextDecoder().decode(this.contents)}serialize(){return F.serialize(this)}static serialize(t){const e=t.name.length,r=t.name.split("").map(n=>n.charCodeAt(0));return new Uint8Array([1].concat([e]).concat(r).concat([t.contents.byteLength]).concat(Array.from(t.contents)))}}class T{constructor(t,e){C(this,"name");C(this,"contents");C(this,"parentDir");C(this,"type","directory");this.name=t,this.parentDir=e,this.contents=[]}delete(t){const e=this.contents.filter(r=>r.name!=t);if(e===this.contents)throw new M;this.contents=e}deleteSelf(){if(!this.parentDir)throw new U("No parent provided, or root directory");this.parentDir.delete(this.name)}rename(t,e){const r=this.get(t);if(!r)throw new M("Could not find resource to rename");r.name=e}renameSelf(t){if(!this.parentDir)throw new U("No parent provided, or root directory");this.parentDir.rename(this.name,t)}addFile(t,e=!0){if(this.contents.map(r=>r.name).includes(t.name))throw new H("Cannot add file, as it already exists");return e&&(t.parentDir=this),this.contents.push(t),t}createFile(t,e){const r=new F(t,e,this);return this.addFile(r),r}createDirectory(t){const e=new T(t,this);return this.contents.push(e),e}get(t,e){if(!t)return this.contents;const r=this.contents.find(n=>n.name==t);if(!r)return null;if(e){if(r.type=="file"&&e=="file"||r.type=="directory"&&e=="directory")return r;throw new TypeError("Predefined type does not match resource type")}return r}serialize(){return T.serialize(this)}static serialize(t){const e=[2],r=t.name.length;e.push(r);const n=t.name.split("").map(a=>a.charCodeAt(0));e.push(...n);const l=[];t.contents.forEach(a=>{const o=a.serialize();l.push(...o)});const s=l.length;if(s<255)e.push(0,s);else{const a=s.toString(16),o=parseInt(a.slice(0,2),16),d=parseInt(a.slice(2),16);e.push(o,d)}return e.push(...l),new Uint8Array(e)}}function L(i){if(typeof i!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(i))}function G(i,t){for(var e="",r=0,n=-1,l=0,s,a=0;a<=i.length;++a){if(a<i.length)s=i.charCodeAt(a);else{if(s===47)break;s=47}if(s===47){if(!(n===a-1||l===1))if(n!==a-1&&l===2){if(e.length<2||r!==2||e.charCodeAt(e.length-1)!==46||e.charCodeAt(e.length-2)!==46){if(e.length>2){var o=e.lastIndexOf("/");if(o!==e.length-1){o===-1?(e="",r=0):(e=e.slice(0,o),r=e.length-1-e.lastIndexOf("/")),n=a,l=0;continue}}else if(e.length===2||e.length===1){e="",r=0,n=a,l=0;continue}}t&&(e.length>0?e+="/..":e="..",r=2)}else e.length>0?e+="/"+i.slice(n+1,a):e=i.slice(n+1,a),r=a-n-1;n=a,l=0}else s===46&&l!==-1?++l:l=-1}return e}function K(i,t){var e=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||"");return e?e===t.root?e+r:e+i+r:r}var B={resolve:function(){for(var t="",e=!1,r,n=arguments.length-1;n>=-1&&!e;n--){var l;n>=0?l=arguments[n]:(r===void 0&&(r=process.cwd()),l=r),L(l),l.length!==0&&(t=l+"/"+t,e=l.charCodeAt(0)===47)}return t=G(t,!e),e?t.length>0?"/"+t:"/":t.length>0?t:"."},normalize:function(t){if(L(t),t.length===0)return".";var e=t.charCodeAt(0)===47,r=t.charCodeAt(t.length-1)===47;return t=G(t,!e),t.length===0&&!e&&(t="."),t.length>0&&r&&(t+="/"),e?"/"+t:t},isAbsolute:function(t){return L(t),t.length>0&&t.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var t,e=0;e<arguments.length;++e){var r=arguments[e];L(r),r.length>0&&(t===void 0?t=r:t+="/"+r)}return t===void 0?".":B.normalize(t)},relative:function(t,e){if(L(t),L(e),t===e||(t=B.resolve(t),e=B.resolve(e),t===e))return"";for(var r=1;r<t.length&&t.charCodeAt(r)===47;++r);for(var n=t.length,l=n-r,s=1;s<e.length&&e.charCodeAt(s)===47;++s);for(var a=e.length,o=a-s,d=l<o?l:o,u=-1,c=0;c<=d;++c){if(c===d){if(o>d){if(e.charCodeAt(s+c)===47)return e.slice(s+c+1);if(c===0)return e.slice(s+c)}else l>d&&(t.charCodeAt(r+c)===47?u=c:c===0&&(u=0));break}var h=t.charCodeAt(r+c),v=e.charCodeAt(s+c);if(h!==v)break;h===47&&(u=c)}var b="";for(c=r+u+1;c<=n;++c)(c===n||t.charCodeAt(c)===47)&&(b.length===0?b+="..":b+="/..");return b.length>0?b+e.slice(s+u):(s+=u,e.charCodeAt(s)===47&&++s,e.slice(s))},_makeLong:function(t){return t},dirname:function(t){if(L(t),t.length===0)return".";for(var e=t.charCodeAt(0),r=e===47,n=-1,l=!0,s=t.length-1;s>=1;--s)if(e=t.charCodeAt(s),e===47){if(!l){n=s;break}}else l=!1;return n===-1?r?"/":".":r&&n===1?"//":t.slice(0,n)},basename:function(t,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');L(t);var r=0,n=-1,l=!0,s;if(e!==void 0&&e.length>0&&e.length<=t.length){if(e.length===t.length&&e===t)return"";var a=e.length-1,o=-1;for(s=t.length-1;s>=0;--s){var d=t.charCodeAt(s);if(d===47){if(!l){r=s+1;break}}else o===-1&&(l=!1,o=s+1),a>=0&&(d===e.charCodeAt(a)?--a===-1&&(n=s):(a=-1,n=o))}return r===n?n=o:n===-1&&(n=t.length),t.slice(r,n)}else{for(s=t.length-1;s>=0;--s)if(t.charCodeAt(s)===47){if(!l){r=s+1;break}}else n===-1&&(l=!1,n=s+1);return n===-1?"":t.slice(r,n)}},extname:function(t){L(t);for(var e=-1,r=0,n=-1,l=!0,s=0,a=t.length-1;a>=0;--a){var o=t.charCodeAt(a);if(o===47){if(!l){r=a+1;break}continue}n===-1&&(l=!1,n=a+1),o===46?e===-1?e=a:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||n===-1||s===0||s===1&&e===n-1&&e===r+1?"":t.slice(e,n)},format:function(t){if(t===null||typeof t!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return K("/",t)},parse:function(t){L(t);var e={root:"",dir:"",base:"",ext:"",name:""};if(t.length===0)return e;var r=t.charCodeAt(0),n=r===47,l;n?(e.root="/",l=1):l=0;for(var s=-1,a=0,o=-1,d=!0,u=t.length-1,c=0;u>=l;--u){if(r=t.charCodeAt(u),r===47){if(!d){a=u+1;break}continue}o===-1&&(d=!1,o=u+1),r===46?s===-1?s=u:c!==1&&(c=1):s!==-1&&(c=-1)}return s===-1||o===-1||c===0||c===1&&s===o-1&&s===a+1?o!==-1&&(a===0&&n?e.base=e.name=t.slice(1,o):e.base=e.name=t.slice(a,o)):(a===0&&n?(e.name=t.slice(1,s),e.base=t.slice(1,o)):(e.name=t.slice(a,s),e.base=t.slice(a,o)),e.ext=t.slice(s,o)),a>0?e.dir=t.slice(0,a-1):n&&(e.dir="/"),e},sep:"/",delimiter:":",win32:null,posix:null};B.posix=B;var Z=B;const D=Q(Z);class z{constructor(t){C(this,"root");C(this,"cwd_path");(typeof t=="string"||t instanceof Uint8Array)&&(t=X(t).root),this.root=t||new T(""),this.cwd_path="/"}cd(t){let e=this.cwd_path;t.forEach(n=>e=D.join(e,n));const r=this.get_by_path(e);return!r||r.type=="file"?!1:(this.cwd_path=e,!0)}cwd(){return this.get_by_path(this.cwd_path)}get_by_path(t){let e=this.root;const r=D.normalize(t).split(D.sep).toSpliced(0,1);if(JSON.stringify(r)==JSON.stringify([""]))return this.root;for(let n=0;n<r.length;n++){const l=r[n],s=e.get(l);if(!s)return null;if(s.type=="file")return s;e=s}return e}serialize(t=!0){const e=this.root.serialize().join(",");return t?N.compress(e):new Uint8Array(e.split(",").map(r=>parseInt(r)))}}function W(i){const t=window.Prism;i.classList.add("code-editor");const e=document.createElement("pre");i.appendChild(e);const r=document.createElement("textarea");r.spellcheck=!1,i.appendChild(r),r.addEventListener("input",()=>{const n=r.value,l=i.parentElement.dataset.filetype;if(l=="text"){e.innerHTML=n,e.style.color="black";return}else e.style.color="darkred";if(!n){e.innerHTML="";return}const s=t.highlight(n,t.languages[l],l);e.innerHTML=s}),r.addEventListener("scroll",()=>{e.scrollTop=r.scrollTop,e.scrollLeft=r.scrollLeft})}let x=new z;function V(){const i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUNJREFUOE+V0j8sn1EUxvGPv6mBUSeJXWM1kZKIJraGVqdKDJI2HUxsGhOThYiNSagY0RqaMJnpLKmJkQiC/Lwnub+kuSl53eXNOe9zv / fe5zw1 / r + 6sI6W9PsCH3GYy2tSI75tqE / 1Mjaxl + p + DGE81fc4RaUK2MG7J27zVHsbgwFoxO0LN4e8glcBqMVKFC + EXBXPGKs + Ifa + R11JyAO2Qvsv4AytuMRJIejE36QJg4 + Km7ajGed4nQOO0YGf6UlrmEs3msQnjGIAf4opvckBv / EWu1hFAGYTYCoBPqdphbYvB0RwPpQEhHYkByzga0lAaL / lgOmi8b0kILQzOeALFksCQruUA4axgTAoghVGzicTJ4rRhoExhd7k1Y8c0F04u58ielOMsAl3CdCA65TWyE4PDnJARPkXAvTcikMiC3GIR2AJShmfkBrbAAAAAElFTkSuQmCC",t=document.createElement("img");return t.src=i,t.style.width="16px",t.style.height="16px",t}function $(i){const t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEISURBVFiF7dbBKoRRGMbxn/kmxGIWCo2JJZfhMtyAW7A1WxYWlJUVytI1cCGszBRFFhgpY/F+k6EhizlfqfOvs3k79Txv39d5HjKZdJzjFrvYRgcXVRo4wDP65XnFUZUGYAk9vGO1avEBN2L7kUxgCm1soJHAQAM1PAzNHnGGdoEdbGEGbwkMTItFe0OzOayL5XXxhGYCcUZ/gmap2SH+0OtE4j8ZUGr2awmF/0Q2kA1kA9lATTzF8yI6q6KFBXTrOBFhdCXe53EzSMP7odksJrFf4BIFVkRyjZtRaXiHQ1EDkvNrIUlNy2clW6tafA8vvpbS0++X6gkNLIsadiza8SYWE+pl/ikf0sI3bxgBTbAAAAAASUVORK5CYII=",e=document.createElement("img");e.src=t;const r=document.createElement("button");return r.appendChild(e),r.addEventListener("click",n=>i(n)),r}function J(i,t,e=!0){const r=document.createElement("div");r.classList.add("fl-ctr");const n=document.createElement("button");if(n.textContent=i.name,i.type=="directory"?(n.classList.add("fl-btn-d"),n.addEventListener("click",()=>{x.cd([i.name]),_()}),document.getElementById("texteditor").hidden=!0):(n.classList.add("fl-btn-f"),n.addEventListener("click",()=>{const l=document.getElementById("texteditor");l.dataset.editing=x.cwd_path+"/"+i.name,l.dataset.filetype={js:"javascript",html:"html",css:"css",json:"json",txt:"text",md:"markdown",py:"python",ts:"typescript"}[i.name.split(".").pop()]||"text",l.querySelector("header").innerText=i.name,l.querySelector("textarea").value=i.read(),l.hidden=!1,document.querySelector("div#editor>textarea")&&document.querySelector("div#editor>textarea").dispatchEvent(new Event("input"))})),r.appendChild(n),e){const l=document.createElement("button");l.classList.add("fl-del"),l.appendChild(V()),l.addEventListener("click",()=>{t.cwd().delete(i.name),_()});const s=$(()=>{const o=prompt("new resource name:",i.name);t.cwd().rename(i.name,o),_()});s.classList.add("fl-rn");const a=document.createElement("div");a.appendChild(s),a.appendChild(l),a.classList.add("fl-edit-buttons"),r.appendChild(a)}return r}function ee(){const i=x.root;i.createFile("file1.txt","This is the first file."),i.createFile("file2.txt","This is the second file.");const t=i.createDirectory("directory");t.createFile("file3.txt","This is the third file."),t.createFile("file4.txt","This is the fourth file."),t.createDirectory("emptydir")}function _(){document.getElementById("cwd-display").innerText=x.cwd_path,x.cwd_path!="/"&&(document.getElementById("cwd-display").innerText+="/");const i=x.cwd().get(),t=document.getElementById("dir-listing");for(;t.firstChild;)t.removeChild(t.firstChild);if(x.cwd_path!="/"){const r=J({name:"..",type:"directory"},x,!1);r.style.backgroundColor="lightcyan",t.appendChild(r)}i.forEach(e=>{const r=J(e,x);t.appendChild(r)})}ee();_();window.onload=()=>{document.querySelector("#texteditor>button").addEventListener("click",()=>{const t=document.getElementById("texteditor").dataset.editing;x.get_by_path(t).write(document.querySelector("textarea").value)}),(()=>{const i=document.querySelector("#new-file-btn"),t=document.querySelector("#new-dir-btn");i.addEventListener("click",()=>{const e=prompt("Enter file name");if(e){if(x.cwd().get().some(r=>r.name==e)){alert("File already exists");return}x.cwd().createFile(e,""),_()}}),t.addEventListener("click",()=>{const e=prompt("Enter directory name");if(e){if(x.cwd().get().some(r=>r.name==e)){alert("Directory already exists");return}x.cwd().createDirectory(e),_()}})})(),document.getElementById("save-btn").addEventListener("click",()=>{const i=x.serialize(),t=new Blob([i],{type:"application/octet-stream"}),e=URL.createObjectURL(t),r=document.createElement("a");r.href=e,r.download="filesystem",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(e)}),document.getElementById("load-btn").addEventListener("click",()=>{const i=document.createElement("input");i.type="file",i.accept="*",i.style.display="none",i.click(),i.addEventListener("change",()=>{const t=i.files[0];if(i.remove(),!t)return;const e=new FileReader;e.onload=r=>{x=new z(r.target.result),_()},e.readAsText(t)})}),document.getElementById("clear-btn").addEventListener("click",()=>{confirm("Are you sure?")&&(x=new z,_())}),(()=>{const i=document.querySelector("#texteditor>#editor");W(i)})()};
