!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("TypeApi",[],e):"object"==typeof exports?exports.TypeApi=e():t.TypeApi=e()}(window,function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=29)}([function(t,e,r){"use strict";var n=r(7),o=r(27),i=Object.prototype.toString;function u(t){return"[object Array]"===i.call(t)}function s(t){return null!==t&&"object"==typeof t}function a(t){return"[object Function]"===i.call(t)}function c(t,e){if(null!==t&&void 0!==t)if("object"!=typeof t&&(t=[t]),u(t))for(var r=0,n=t.length;r<n;r++)e.call(null,t[r],r,t);else for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(null,t[o],o,t)}t.exports={isArray:u,isArrayBuffer:function(t){return"[object ArrayBuffer]"===i.call(t)},isBuffer:o,isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:s,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===i.call(t)},isFile:function(t){return"[object File]"===i.call(t)},isBlob:function(t){return"[object Blob]"===i.call(t)},isFunction:a,isStream:function(t){return s(t)&&a(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function t(){var e={};function r(r,n){"object"==typeof e[n]&&"object"==typeof r?e[n]=t(e[n],r):e[n]=r}for(var n=0,o=arguments.length;n<o;n++)c(arguments[n],r);return e},extend:function(t,e,r){return c(e,function(e,o){t[o]=r&&"function"==typeof e?n(e,r):e}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(t,e,r){t.exports=r(28)},function(t,e,r){"use strict";var n=r(0),o=r(25),i={"Content-Type":"application/x-www-form-urlencoded"};function u(t,e){!n.isUndefined(t)&&n.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var s,a={adapter:("undefined"!=typeof XMLHttpRequest?s=r(6):"undefined"!=typeof process&&(s=r(6)),s),transformRequest:[function(t,e){return o(e,"Content-Type"),n.isFormData(t)||n.isArrayBuffer(t)||n.isBuffer(t)||n.isStream(t)||n.isFile(t)||n.isBlob(t)?t:n.isArrayBufferView(t)?t.buffer:n.isURLSearchParams(t)?(u(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):n.isObject(t)?(u(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],function(t){a.headers[t]={}}),n.forEach(["post","put","patch"],function(t){a.headers[t]=n.merge(i)}),t.exports=a},function(t,e,r){"use strict";function n(t){this.message=t}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,t.exports=n},function(t,e,r){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},function(t,e,r){"use strict";var n=r(23);t.exports=function(t,e,r,o,i){var u=new Error(t);return n(u,e,r,o,i)}},function(t,e,r){"use strict";var n=r(0),o=r(24),i=r(22),u=r(21),s=r(20),a=r(5),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r(19);t.exports=function(t){return new Promise(function(e,f){var p=t.data,l=t.headers;n.isFormData(p)&&delete l["Content-Type"];var h=new XMLHttpRequest,d="onreadystatechange",y=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||s(t.url)||(h=new window.XDomainRequest,d="onload",y=!0,h.onprogress=function(){},h.ontimeout=function(){}),t.auth){var v=t.auth.username||"",w=t.auth.password||"";l.Authorization="Basic "+c(v+":"+w)}if(h.open(t.method.toUpperCase(),i(t.url,t.params,t.paramsSerializer),!0),h.timeout=t.timeout,h[d]=function(){if(h&&(4===h.readyState||y)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in h?u(h.getAllResponseHeaders()):null,n={data:t.responseType&&"text"!==t.responseType?h.response:h.responseText,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:r,config:t,request:h};o(e,f,n),h=null}},h.onerror=function(){f(a("Network Error",t,null,h)),h=null},h.ontimeout=function(){f(a("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",h)),h=null},n.isStandardBrowserEnv()){var b=r(18),g=(t.withCredentials||s(t.url))&&t.xsrfCookieName?b.read(t.xsrfCookieName):void 0;g&&(l[t.xsrfHeaderName]=g)}if("setRequestHeader"in h&&n.forEach(l,function(t,e){void 0===p&&"content-type"===e.toLowerCase()?delete l[e]:h.setRequestHeader(e,t)}),t.withCredentials&&(h.withCredentials=!0),t.responseType)try{h.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&h.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){h&&(h.abort(),f(t),h=null)}),void 0===p&&(p=null),h.send(p)})}},function(t,e,r){"use strict";t.exports=function(t,e){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return t.apply(e,r)}}},function(t,e,r){"use strict";r.r(e);var n=r(1),o=r.n(n),i=function(){function t(t){this.baseUrl="",this.instance=o.a,t&&(this.baseUrl=t)}return t.prototype.get=function(t,e){return o.a.get(""+this.baseUrl+t,e)},t.prototype.post=function(t,e,r){return o.a.post(""+this.baseUrl+t,e,r)},t.prototype.put=function(t,e,r){return o.a.put(""+this.baseUrl+t,e,r)},t.prototype.patch=function(t,e,r){return o.a.patch(""+this.baseUrl+t,e,r)},t.prototype.delete=function(t,e){return o.a.delete(""+this.baseUrl+t,e)},t}(),u=(r(10),function(t,e,r,n){return new(r||(r=Promise))(function(o,i){function u(t){try{a(n.next(t))}catch(t){i(t)}}function s(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new r(function(e){e(t.value)}).then(u,s)}a((n=n.apply(t,e||[])).next())})}),s=function(t,e){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};function a(t){return function(e){return Reflect.defineMetadata("driver",new t,e),e}}function c(t){var e=t.endpoint,r=t.baseUrl;return function(t){return Reflect.defineMetadata("endpoint",e,t),Reflect.defineMetadata("baseUrl",r,t),t}}function f(t){return function(e,r,n){var o=Reflect.getMetadata("beforeRequest",e)||[];return o.push(t),Reflect.defineMetadata("beforeRequest",o,e),e}}function p(t){return function(e,r,n){if(!n){var o=Reflect.getMetadata("afterRequest",e)||[];return o.push(t),Reflect.defineMetadata("afterRequest",o,e),e}var i=n.value;n.value=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return u(this,void 0,void 0,function(){var r;return s(this,function(n){switch(n.label){case 0:if(!i)return[2];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,i.apply(this,e)];case 2:return r=n.sent(),[3,4];case 3:throw n.sent();case 4:return[2,t(r)]}})})}}}function l(t){return function(e,r,n){var o=Reflect.getMetadata("onError",e)||[];return o.push(t),Reflect.defineMetadata("onError",o,e),e}}var h,d=function(t,e,r,n){var o,i=arguments.length,u=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(u=(i<3?o(u):i>3?o(e,r,u):o(e,r))||u);return i>3&&u&&Object.defineProperty(e,r,u),u},y=function(t,e,r,n){return new(r||(r=Promise))(function(o,i){function u(t){try{a(n.next(t))}catch(t){i(t)}}function s(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new r(function(e){e(t.value)}).then(u,s)}a((n=n.apply(t,e||[])).next())})},v=function(t,e){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},w=function(){function t(){}return t.prototype.prepareRequest=function(t,e,r){void 0===r&&(r={}),this.driver||(this.driver=Reflect.getMetadata("driver",this.constructor));var n=Reflect.getMetadata("beforeRequest",this.constructor),o={endpoint:t,postData:e,options:r};return n?(n.forEach(function(t){o=t(o.endpoint,o.postData,o.options)}),o):o},t.prototype.getEndpoint=function(){return Reflect.getMetadata("endpoint",this.constructor)},t.prototype.buildUrl=function(t){var e=[Reflect.getMetadata("baseUrl",this.constructor)];return this.getEndpoint()&&""!==this.getEndpoint()&&e.push(this.getEndpoint()),e.push(t),e.map(function(t){return t.replace(/^\/?|\/?$/,"")}).join("/")},t.prototype.afterResponse=function(t){var e=Reflect.getMetadata("afterRequest",this.constructor),r=t;return e?(e.forEach(function(t){r=t(r)}),r):r},t.prototype.handlerError=function(t){var e=Reflect.getMetadata("onError",this.constructor),r=t;return e?(e.forEach(function(t){r=t(r)}),r):r},t.prototype.post=function(t,e,r){return y(this,void 0,void 0,function(){var n,o,i,u,s,a;return v(this,function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),n=this.prepareRequest(this.buildUrl(t),e,r),o=n.endpoint,i=n.postData,u=n.options,[4,this.driver.post(o,i,u)];case 1:return s=c.sent(),[2,(s=this.afterResponse(s)).data];case 2:throw a=c.sent(),this.handlerError(a);case 3:return[2]}})})},t.prototype.put=function(t,e,r){return y(this,void 0,void 0,function(){var n,o,i,u,s,a;return v(this,function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),n=this.prepareRequest(this.buildUrl(t),e,r),o=n.endpoint,i=n.postData,u=n.options,[4,this.driver.put(o,i,u)];case 1:return s=c.sent(),[2,(s=this.afterResponse(s)).data];case 2:throw a=c.sent(),this.handlerError(a);case 3:return[2]}})})},t.prototype.patch=function(t,e,r){return y(this,void 0,void 0,function(){var n,o,i,u,s,a;return v(this,function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),n=this.prepareRequest(this.buildUrl(t),e,r),o=n.endpoint,i=n.postData,u=n.options,[4,this.driver.patch(o,i,u)];case 1:return s=c.sent(),[2,(s=this.afterResponse(s)).data];case 2:throw a=c.sent(),this.handlerError(a);case 3:return[2]}})})},t.prototype.delete=function(t,e){return y(this,void 0,void 0,function(){var r,n,o,i,u;return v(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),r=this.prepareRequest(this.buildUrl(t),null,e),n=r.endpoint,r.postData,o=r.options,[4,this.driver.delete(n,o)];case 1:return i=s.sent(),[2,(i=this.afterResponse(i)).data];case 2:throw u=s.sent(),this.handlerError(u);case 3:return[2]}})})},t.prototype.get=function(t,e){return y(this,void 0,void 0,function(){var r,n,o,i,u;return v(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),r=this.prepareRequest(this.buildUrl(t),null,e),n=r.endpoint,o=r.options,[4,this.driver.get(n,o)];case 1:return i=s.sent(),[2,(i=this.afterResponse(i)).data];case 2:throw u=s.sent(),console.log(u),this.handlerError(u);case 3:return[2]}})})},t=d([a(i)],t)}(),b=(h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},function(t,e){function r(){this.constructor=t}h(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),g=function(t,e,r,n){var o,i=arguments.length,u=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(u=(i<3?o(u):i>3?o(e,r,u):o(e,r))||u);return i>3&&u&&Object.defineProperty(e,r,u),u},m=function(t,e,r,n){return new(r||(r=Promise))(function(o,i){function u(t){try{a(n.next(t))}catch(t){i(t)}}function s(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new r(function(e){e(t.value)}).then(u,s)}a((n=n.apply(t,e||[])).next())})},_=function(t,e){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},x=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return b(e,t),e.prototype.create=function(t,e){return m(this,void 0,void 0,function(){return _(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.post("",t,e)];case 1:return[2,r.sent()];case 2:throw r.sent();case 3:return[2]}})})},e.prototype.update=function(t,e,r){return m(this,void 0,void 0,function(){return _(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this.put(""+t,e,r)];case 1:return[2,n.sent()];case 2:throw n.sent();case 3:return[2]}})})},e.prototype.findById=function(t,e){return m(this,void 0,void 0,function(){return _(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.get(""+t,e)];case 1:return[2,r.sent()];case 2:throw r.sent();case 3:return[2]}})})},e.prototype.findAll=function(t){return m(this,void 0,void 0,function(){return _(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,this.get("",t)];case 1:return[2,e.sent()];case 2:throw e.sent();case 3:return[2]}})})},e.prototype.find=function(t,e){return void 0===e&&(e={}),m(this,void 0,void 0,function(){return _(this,function(r){switch(r.label){case 0:e.params=t,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,this.get("",e)];case 2:return[2,r.sent()];case 3:throw r.sent();case 4:return[2]}})})},e.prototype.updateAttributes=function(t,e,r){return m(this,void 0,void 0,function(){return _(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this.patch(""+t,e,r)];case 1:return[2,n.sent()];case 2:throw n.sent();case 3:return[2]}})})},e.prototype.destroy=function(t,e){return m(this,void 0,void 0,function(){return _(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.delete(""+t,e)];case 1:return[2,r.sent()];case 2:throw r.sent();case 3:return[2]}})})},e=g([a(i)],e)}(w),E=function(){function t(t){this.keepAliveUrl="",this.token="";var e=localStorage.getItem("JWTSession.token");e&&(this.token=e),this.keepAliveUrl=t.keepAliveUrl}return t.prototype.authorize=function(t){if(t&&t.token)return this.token=t.token,localStorage.setItem("JWTSession.token",this.token),t},t.prototype.deauthorize=function(t){return this.token="",localStorage.removeItem("JWTSession.token"),t},t.prototype.secure=function(t,e,r){return this.token?(r.headers?r.headers.Authorization="JWT "+this.token:r.headers={Authorization:"JWT "+this.token},{endpoint:t,postData:e,options:r}):{endpoint:t,postData:e,options:r}},t}();r.d(e,"RestApi",function(){return x}),r.d(e,"Api",function(){return w}),r.d(e,"AxiosDriver",function(){return i}),r.d(e,"driver",function(){return a}),r.d(e,"rest",function(){return c}),r.d(e,"before",function(){return f}),r.d(e,"after",function(){return p}),r.d(e,"errorHandler",function(){return l}),r.d(e,"JWTSession",function(){return E})},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){(function(t){var e;!function(e){!function(r){var n="object"==typeof t?t:"object"==typeof self?self:"object"==typeof this?this:Function("return this;")(),o=i(e);function i(t,e){return function(r,n){"function"!=typeof t[r]&&Object.defineProperty(t,r,{configurable:!0,writable:!0,value:n}),e&&e(r,n)}}void 0===n.Reflect?n.Reflect=e:o=i(n.Reflect,o),function(t){var e=Object.prototype.hasOwnProperty,r="function"==typeof Symbol,n=r&&void 0!==Symbol.toPrimitive?Symbol.toPrimitive:"@@toPrimitive",o=r&&void 0!==Symbol.iterator?Symbol.iterator:"@@iterator",i="function"==typeof Object.create,u={__proto__:[]}instanceof Array,s=!i&&!u,a={create:i?function(){return P(Object.create(null))}:u?function(){return P({__proto__:null})}:function(){return P({})},has:s?function(t,r){return e.call(t,r)}:function(t,e){return e in t},get:s?function(t,r){return e.call(t,r)?t[r]:void 0}:function(t,e){return t[e]}},c=Object.getPrototypeOf(Function),f="object"==typeof process&&Object({NODE_ENV:"development"})&&"true"===Object({NODE_ENV:"development"}).REFLECT_METADATA_USE_MAP_POLYFILL,p=f||"function"!=typeof Map||"function"!=typeof Map.prototype.entries?function(){var t={},e=[],r=function(){function t(t,e,r){this._index=0,this._keys=t,this._values=e,this._selector=r}return t.prototype["@@iterator"]=function(){return this},t.prototype[o]=function(){return this},t.prototype.next=function(){var t=this._index;if(t>=0&&t<this._keys.length){var r=this._selector(this._keys[t],this._values[t]);return t+1>=this._keys.length?(this._index=-1,this._keys=e,this._values=e):this._index++,{value:r,done:!1}}return{value:void 0,done:!0}},t.prototype.throw=function(t){throw this._index>=0&&(this._index=-1,this._keys=e,this._values=e),t},t.prototype.return=function(t){return this._index>=0&&(this._index=-1,this._keys=e,this._values=e),{value:t,done:!0}},t}();return function(){function e(){this._keys=[],this._values=[],this._cacheKey=t,this._cacheIndex=-2}return Object.defineProperty(e.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),e.prototype.has=function(t){return this._find(t,!1)>=0},e.prototype.get=function(t){var e=this._find(t,!1);return e>=0?this._values[e]:void 0},e.prototype.set=function(t,e){var r=this._find(t,!0);return this._values[r]=e,this},e.prototype.delete=function(e){var r=this._find(e,!1);if(r>=0){for(var n=this._keys.length,o=r+1;o<n;o++)this._keys[o-1]=this._keys[o],this._values[o-1]=this._values[o];return this._keys.length--,this._values.length--,e===this._cacheKey&&(this._cacheKey=t,this._cacheIndex=-2),!0}return!1},e.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=t,this._cacheIndex=-2},e.prototype.keys=function(){return new r(this._keys,this._values,n)},e.prototype.values=function(){return new r(this._keys,this._values,i)},e.prototype.entries=function(){return new r(this._keys,this._values,u)},e.prototype["@@iterator"]=function(){return this.entries()},e.prototype[o]=function(){return this.entries()},e.prototype._find=function(t,e){return this._cacheKey!==t&&(this._cacheIndex=this._keys.indexOf(this._cacheKey=t)),this._cacheIndex<0&&e&&(this._cacheIndex=this._keys.length,this._keys.push(t),this._values.push(void 0)),this._cacheIndex},e}();function n(t,e){return t}function i(t,e){return e}function u(t,e){return[t,e]}}():Map,l=f||"function"!=typeof Set||"function"!=typeof Set.prototype.entries?function(){function t(){this._map=new p}return Object.defineProperty(t.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),t.prototype.has=function(t){return this._map.has(t)},t.prototype.add=function(t){return this._map.set(t,t),this},t.prototype.delete=function(t){return this._map.delete(t)},t.prototype.clear=function(){this._map.clear()},t.prototype.keys=function(){return this._map.keys()},t.prototype.values=function(){return this._map.values()},t.prototype.entries=function(){return this._map.entries()},t.prototype["@@iterator"]=function(){return this.keys()},t.prototype[o]=function(){return this.keys()},t}():Set,h=new(f||"function"!=typeof WeakMap?function(){var t=16,r=a.create(),n=o();return function(){function t(){this._key=o()}return t.prototype.has=function(t){var e=i(t,!1);return void 0!==e&&a.has(e,this._key)},t.prototype.get=function(t){var e=i(t,!1);return void 0!==e?a.get(e,this._key):void 0},t.prototype.set=function(t,e){var r=i(t,!0);return r[this._key]=e,this},t.prototype.delete=function(t){var e=i(t,!1);return void 0!==e&&delete e[this._key]},t.prototype.clear=function(){this._key=o()},t}();function o(){var t;do{t="@@WeakMap@@"+s()}while(a.has(r,t));return r[t]=!0,t}function i(t,r){if(!e.call(t,n)){if(!r)return;Object.defineProperty(t,n,{value:a.create()})}return t[n]}function u(t,e){for(var r=0;r<e;++r)t[r]=255*Math.random()|0;return t}function s(){var e=function(t){if("function"==typeof Uint8Array)return"undefined"!=typeof crypto?crypto.getRandomValues(new Uint8Array(t)):"undefined"!=typeof msCrypto?msCrypto.getRandomValues(new Uint8Array(t)):u(new Uint8Array(t),t);return u(new Array(t),t)}(t);e[6]=79&e[6]|64,e[8]=191&e[8]|128;for(var r="",n=0;n<t;++n){var o=e[n];4!==n&&6!==n&&8!==n||(r+="-"),o<16&&(r+="0"),r+=o.toString(16).toLowerCase()}return r}}():WeakMap);function d(t,e,r){var n=h.get(t);if(m(n)){if(!r)return;n=new p,h.set(t,n)}var o=n.get(e);if(m(o)){if(!r)return;o=new p,n.set(e,o)}return o}function y(t,e,r){var n=d(e,r,!1);return!m(n)&&!!n.has(t)}function v(t,e,r){var n=d(e,r,!1);if(!m(n))return n.get(t)}function w(t,e,r,n){var o=d(r,n,!0);o.set(t,e)}function b(t,e){var r=[],n=d(t,e,!1);if(m(n))return r;for(var i=n.keys(),u=function(t){var e=O(t,o);if(!j(e))throw new TypeError;var r=e.call(t);if(!x(r))throw new TypeError;return r}(i),s=0;;){var a=A(u);if(!a)return r.length=s,r;var c=a.value;try{r[s]=c}catch(t){try{S(u)}finally{throw t}}s++}}function g(t){if(null===t)return 1;switch(typeof t){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return null===t?1:6;default:return 6}}function m(t){return void 0===t}function _(t){return null===t}function x(t){return"object"==typeof t?null!==t:"function"==typeof t}function E(t,e){switch(g(t)){case 0:case 1:case 2:case 3:case 4:case 5:return t}var r=3===e?"string":5===e?"number":"default",o=O(t,n);if(void 0!==o){var i=o.call(t,r);if(x(i))throw new TypeError;return i}return function(t,e){if("string"===e){var r=t.toString;if(j(r)){var n=r.call(t);if(!x(n))return n}var o=t.valueOf;if(j(o)){var n=o.call(t);if(!x(n))return n}}else{var o=t.valueOf;if(j(o)){var n=o.call(t);if(!x(n))return n}var i=t.toString;if(j(i)){var n=i.call(t);if(!x(n))return n}}throw new TypeError}(t,"default"===r?"number":r)}function R(t){var e=E(t,3);return"symbol"==typeof e?e:function(t){return""+t}(e)}function k(t){return Array.isArray?Array.isArray(t):t instanceof Object?t instanceof Array:"[object Array]"===Object.prototype.toString.call(t)}function j(t){return"function"==typeof t}function T(t){return"function"==typeof t}function O(t,e){var r=t[e];if(void 0!==r&&null!==r){if(!j(r))throw new TypeError;return r}}function A(t){var e=t.next();return!e.done&&e}function S(t){var e=t.return;e&&e.call(t)}function U(t){var e=Object.getPrototypeOf(t);if("function"!=typeof t||t===c)return e;if(e!==c)return e;var r=t.prototype,n=r&&Object.getPrototypeOf(r);if(null==n||n===Object.prototype)return e;var o=n.constructor;return"function"!=typeof o?e:o===t?e:o}function P(t){return t.__=void 0,delete t.__,t}t("decorate",function(t,e,r,n){if(m(r)){if(!k(t))throw new TypeError;if(!T(e))throw new TypeError;return function(t,e){for(var r=t.length-1;r>=0;--r){var n=t[r],o=n(e);if(!m(o)&&!_(o)){if(!T(o))throw new TypeError;e=o}}return e}(t,e)}if(!k(t))throw new TypeError;if(!x(e))throw new TypeError;if(!x(n)&&!m(n)&&!_(n))throw new TypeError;return _(n)&&(n=void 0),r=R(r),function(t,e,r,n){for(var o=t.length-1;o>=0;--o){var i=t[o],u=i(e,r,n);if(!m(u)&&!_(u)){if(!x(u))throw new TypeError;n=u}}return n}(t,e,r,n)}),t("metadata",function(t,e){return function(r,n){if(!x(r))throw new TypeError;if(!m(n)&&!function(t){switch(g(t)){case 3:case 4:return!0;default:return!1}}(n))throw new TypeError;w(t,e,r,n)}}),t("defineMetadata",function(t,e,r,n){if(!x(r))throw new TypeError;m(n)||(n=R(n));return w(t,e,r,n)}),t("hasMetadata",function(t,e,r){if(!x(e))throw new TypeError;m(r)||(r=R(r));return function t(e,r,n){var o=y(e,r,n);if(o)return!0;var i=U(r);if(!_(i))return t(e,i,n);return!1}(t,e,r)}),t("hasOwnMetadata",function(t,e,r){if(!x(e))throw new TypeError;m(r)||(r=R(r));return y(t,e,r)}),t("getMetadata",function(t,e,r){if(!x(e))throw new TypeError;m(r)||(r=R(r));return function t(e,r,n){var o=y(e,r,n);if(o)return v(e,r,n);var i=U(r);if(!_(i))return t(e,i,n);return}(t,e,r)}),t("getOwnMetadata",function(t,e,r){if(!x(e))throw new TypeError;m(r)||(r=R(r));return v(t,e,r)}),t("getMetadataKeys",function(t,e){if(!x(t))throw new TypeError;m(e)||(e=R(e));return function t(e,r){var n=b(e,r);var o=U(e);if(null===o)return n;var i=t(o,r);if(i.length<=0)return n;if(n.length<=0)return i;var u=new l;var s=[];for(var a=0,c=n;a<c.length;a++){var f=c[a],p=u.has(f);p||(u.add(f),s.push(f))}for(var h=0,d=i;h<d.length;h++){var f=d[h],p=u.has(f);p||(u.add(f),s.push(f))}return s}(t,e)}),t("getOwnMetadataKeys",function(t,e){if(!x(t))throw new TypeError;m(e)||(e=R(e));return b(t,e)}),t("deleteMetadata",function(t,e,r){if(!x(e))throw new TypeError;m(r)||(r=R(r));var n=d(e,r,!1);if(m(n))return!1;if(!n.delete(t))return!1;if(n.size>0)return!0;var o=h.get(e);return o.delete(r),o.size>0||(h.delete(e),!0)})}(o)}()}(e||(e={}))}).call(this,r(9))},function(t,e,r){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},function(t,e,r){"use strict";var n=r(3);function o(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var r=this;t(function(t){r.reason||(r.reason=new n(t),e(r.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t;return{token:new o(function(e){t=e}),cancel:t}},t.exports=o},function(t,e,r){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},function(t,e,r){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},function(t,e,r){"use strict";var n=r(0);t.exports=function(t,e,r){return n.forEach(r,function(r){t=r(t,e)}),t}},function(t,e,r){"use strict";var n=r(0),o=r(15),i=r(4),u=r(2),s=r(14),a=r(13);function c(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){return c(t),t.baseURL&&!s(t.url)&&(t.url=a(t.baseURL,t.url)),t.headers=t.headers||{},t.data=o(t.data,t.headers,t.transformRequest),t.headers=n.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||u.adapter)(t).then(function(e){return c(t),e.data=o(e.data,e.headers,t.transformResponse),e},function(e){return i(e)||(c(t),e&&e.response&&(e.response.data=o(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},function(t,e,r){"use strict";var n=r(0);function o(){this.handlers=[]}o.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){n.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=o},function(t,e,r){"use strict";var n=r(0);t.exports=n.isStandardBrowserEnv()?{write:function(t,e,r,o,i,u){var s=[];s.push(t+"="+encodeURIComponent(e)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===u&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(t,e,r){"use strict";var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",t.exports=function(t){for(var e,r,i=String(t),u="",s=0,a=n;i.charAt(0|s)||(a="=",s%1);u+=a.charAt(63&e>>8-s%1*8)){if((r=i.charCodeAt(s+=.75))>255)throw new o;e=e<<8|r}return u}},function(t,e,r){"use strict";var n=r(0);t.exports=n.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(t){var n=t;return e&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return t=o(window.location.href),function(e){var r=n.isString(e)?o(e):e;return r.protocol===t.protocol&&r.host===t.host}}():function(){return!0}},function(t,e,r){"use strict";var n=r(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,r,i,u={};return t?(n.forEach(t.split("\n"),function(t){if(i=t.indexOf(":"),e=n.trim(t.substr(0,i)).toLowerCase(),r=n.trim(t.substr(i+1)),e){if(u[e]&&o.indexOf(e)>=0)return;u[e]="set-cookie"===e?(u[e]?u[e]:[]).concat([r]):u[e]?u[e]+", "+r:r}}),u):u}},function(t,e,r){"use strict";var n=r(0);function o(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,r){if(!e)return t;var i;if(r)i=r(e);else if(n.isURLSearchParams(e))i=e.toString();else{var u=[];n.forEach(e,function(t,e){null!==t&&void 0!==t&&(n.isArray(t)?e+="[]":t=[t],n.forEach(t,function(t){n.isDate(t)?t=t.toISOString():n.isObject(t)&&(t=JSON.stringify(t)),u.push(o(e)+"="+o(t))}))}),i=u.join("&")}return i&&(t+=(-1===t.indexOf("?")?"?":"&")+i),t}},function(t,e,r){"use strict";t.exports=function(t,e,r,n,o){return t.config=e,r&&(t.code=r),t.request=n,t.response=o,t}},function(t,e,r){"use strict";var n=r(5);t.exports=function(t,e,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?e(n("Request failed with status code "+r.status,r.config,null,r.request,r)):t(r)}},function(t,e,r){"use strict";var n=r(0);t.exports=function(t,e){n.forEach(t,function(r,n){n!==e&&n.toUpperCase()===e.toUpperCase()&&(t[e]=r,delete t[n])})}},function(t,e,r){"use strict";var n=r(2),o=r(0),i=r(17),u=r(16);function s(t){this.defaults=t,this.interceptors={request:new i,response:new i}}s.prototype.request=function(t){"string"==typeof t&&(t=o.merge({url:arguments[0]},arguments[1])),(t=o.merge(n,{method:"get"},this.defaults,t)).method=t.method.toLowerCase();var e=[u,void 0],r=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)r=r.then(e.shift(),e.shift());return r},o.forEach(["delete","get","head","options"],function(t){s.prototype[t]=function(e,r){return this.request(o.merge(r||{},{method:t,url:e}))}}),o.forEach(["post","put","patch"],function(t){s.prototype[t]=function(e,r,n){return this.request(o.merge(n||{},{method:t,url:e,data:r}))}}),t.exports=s},function(t,e){function r(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}t.exports=function(t){return null!=t&&(r(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&r(t.slice(0,0))}(t)||!!t._isBuffer)}},function(t,e,r){"use strict";var n=r(0),o=r(7),i=r(26),u=r(2);function s(t){var e=new i(t),r=o(i.prototype.request,e);return n.extend(r,i.prototype,e),n.extend(r,e),r}var a=s(u);a.Axios=i,a.create=function(t){return s(n.merge(u,t))},a.Cancel=r(3),a.CancelToken=r(12),a.isCancel=r(4),a.all=function(t){return Promise.all(t)},a.spread=r(11),t.exports=a,t.exports.default=a},function(t,e,r){t.exports=r(8)}])});
//# sourceMappingURL=index.js.map