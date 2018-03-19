!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jso=t():e.jso=t()}(window,function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var o={epoch:function(){return Math.round((new Date).getTime()/1e3)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},parseQueryString:function(e){for(var t,r=/\+/g,o=/([^&;=]+)=?([^&;]*)/g,n=function(e){return decodeURIComponent(e.replace(r," "))},s=e,i={};t=o.exec(s);)i[n(t[1])]=n(t[2]);return i},scopeList:function(e){return o.uniqueList(e).join(" ")},uniqueList:function(e){for(var t={},r=[],o=0;o<e.length;o++)t[e[o]]=1;for(var n in t)t.hasOwnProperty(n)&&r.push(n);return r}};o.uuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},o.log=function(e){console&&console.log&&(arguments.length>1?console.log("[JSO]",...arguments):console.log("[JSO]",e))},o.encodeURL=function(e,t){var r,o=e,n=0,s=-1===e.indexOf("?")?"?":"&";for(r in t)o+=(0==n++?s:"&")+encodeURIComponent(r)+"="+encodeURIComponent(t[r]);return o},o.epoch=function(){return Math.round((new Date).getTime()/1e3)};var n=o;var s=new class{constructor(){}saveState(e,t){localStorage.setItem("state-"+e,JSON.stringify(t))}getState(e){var t=JSON.parse(localStorage.getItem("state-"+e));return localStorage.removeItem("state-"+e),t}hasScope(e,t){var r;if(!e.scopes)return!1;for(r=0;r<e.scopes.length;r++)if(e.scopes[r]===t)return!0;return!1}filterTokens(e,t){var r,o,s,i=[],a=n.epoch();for(t||(t=[]),r=0;r<e.length;r++){for(s=!0,e[r].expires&&e[r].expires<a+1&&(s=!1),o=0;o<t.length;o++)store.hasScope(e[r],t[o])||(s=!1);s&&i.push(e[r])}return i}saveTokens(e,t){localStorage.setItem("tokens-"+e,JSON.stringify(t))}getTokens(e){var t=JSON.parse(localStorage.getItem("tokens-"+e));return t||(t=[]),n.log("Token received",t),t}wipeTokens(e){localStorage.removeItem("tokens-"+e)}saveToken(e,t){var r=this.getTokens(e);(r=this.filterTokens(r)).push(t),this.saveTokens(e,r)}getToken(e,t){var r=this.getTokens(e);return(r=this.filterTokens(r,t)).length<1?null:r[0]}};class i{constructor(e){console.log("Initializing a loader with url "+e),this.url=e}execute(){}}class a extends i{execute(){var e=this;return new Promise(function(t,r){window.location=e.url,t()})}}class c extends i{execute(){return console.error("Popup loaded..."),new Promise((e,t)=>{window.addEventListener("message",function(t){console.log("Sent a message to event.origin "+t.origin+" and got the following in response:"),console.log("<em>"+t.data+"</em>");var o=r.location.href;console.error("Popup location is ",o,r.location),e(o)}),window.popupCompleted=function(){var t=r.location.href;console.error("Popup location is ",t,r.location),e(t)};var r=window.open(this.url,"uwap-auth","height=600,width=800");if(console.log("Newwindow is ",r),null===r)throw new Error("Error loading popup window");window.focus&&r.focus()})}}class u{constructor(){this.config={};for(var e=0;e<arguments.length;e++)Object.assign(this.config,arguments[e])}has(e){var t=this.config,r=e.split("."),o=0;for(o=0;o<r.length;o++){if(!t.hasOwnProperty(r[o]))return!1;t=t[r[o]]}return!0}getValue(e,t,r){r=r||!1;var o=this.config,n=e.split("."),s=0;for(s=0;s<n.length;s++){if(!o.hasOwnProperty(n[s])){o=void 0;break}o=o[n[s]]}if(void 0===o){if(r)throw new Error("Configuration option ["+n[s]+"] required but not provided.");return t}return o}}r.d(t,"JSO",function(){return h}),r.d(t,"BasicLoader",function(){return i}),r.d(t,"HTTPRedirect",function(){return a}),r.d(t,"Popup",function(){return c});const l=r(1),p={lifetime:3600,debug:!0};class h{constructor(e){this.configure(e),this.providerID=this.getProviderID(),this.Loader=a,this.callbacks={}}configure(e){this.config=new u(p,e)}setLoader(e){if("function"!=typeof e)throw new Error("loader MUST be an instance of the JSO BasicLoader");this.Loader=e}on(e,t){if("string"!=typeof e)throw new Error("Registering triggers on JSO must be identified with an event id");if("function"!=typeof t)throw new Error("Registering a callback on JSO must be a function.");this.callbacks[e]=t}getProviderID(){var e=this.config.getValue("providerID",null);if(null!==e)return e;var t=this.config.getValue("client_id",null,!0);return this.config.getValue("authorization",null,!0)+"|"+t}processTokenResponse(e){var t=this;return new Promise(function(r,o){var i,a=n.epoch();if(!e.state)throw new Error("Could not get state from storage.");if(!(i=s.getState(e.state)))throw new Error("Could not retrieve state");if(!i.providerID)throw new Error("Could not get providerid from state");n.log("Checking atoken ",e,""),e.expires_in?e.expires=a+parseInt(e.expires_in,10):!1===t.config.getValue("default_lifetime",null)?e.expires=null:t.config.has("permanent_scope")?s.hasScope(e,t.config.getValue("permanent_scope"))||(e.expires=null):t.config.has("default_lifetime")?e.expires=a+t.config.getValue("default_lifetime"):e.expires=a+3600,e.scope?e.scopes=e.scope.split(" "):i.scopes?e.scopes=i.scopes:e.scopes=[],s.saveToken(i.providerID,e),i.restoreHash?window.location.hash=i.restoreHash:window.location.hash="",r(e)})}processErrorResponse(e){return new Promise(function(t,r){var o;if(!e.state)throw new Error("Could not get [state] and no default providerid is provided.");if(!(o=s.getState(e.state)))throw new Error("Could not retrieve state");if(!o.providerID)throw new Error("Could not get providerid from state");o.restoreHash?window.location.hash=o.restoreHash:window.location.hash="",r(new h.OAuthResponseError(e))})}callback(e){var t=this;return Promise.resolve().then(function(){var r,o=window.location.hash;if(n.log("JSO.prototype.callback() "+e),e){if(-1===e.indexOf("#"))return;o=e.substring(e.indexOf("#"))}if(!(o.length<2))return o=o.substring(1),(r=n.parseQueryString(o)).hasOwnProperty("access_token")?t.processTokenResponse(r):r.hasOwnProperty("error")?t.processErrorResponse(r):void 0})}dump(){var e=s.getTokens(this.providerID);return{providerID:this.providerID,tokens:e,config:this.config}}_getRequestScopes(e){var t,r=[];if(this.config.has("scopes.request")){let e=this.config.getValue("scopes.request");for(t=0;t<e.length;t++)r.push(e[t])}if(e&&e.scopes&&e.scopes.request)for(t=0;t<e.scopes.request.length;t++)r.push(e.scopes.request[t]);return n.uniqueList(r)}_getRequiredScopes(e){var t,r=[];if(this.config.has("scopes.require")){let e=this.config.getValue("scopes.require");for(t=0;t<e.length;t++)r.push(e[t])}if(e&&e.scopes&&e.scopes.require)for(t=0;t<e.scopes.require.length;t++)r.push(e.scopes.require[t]);return n.uniqueList(r)}getToken(e){var t=this;return Promise.resolve().then(function(){var r=t._getRequiredScopes(e),o=s.getToken(t.providerID,r);return Promise.resolve().then(function(){if(o)return o;if(e.hasOwnProperty("allowredir")&&!e.allowredir)throw new Error("Cannot obtain a token, when not allowed to redirect...");return t._authorize(e)})})}checkToken(e){var t=this._getRequiredScopes(e);return s.getToken(this.providerID,t)}_authorize(e){var t,r,o;return Promise.resolve().then(()=>{var i=this.config.getValue("authorization",null,!0),a=this.config.getValue("client_id",null,!0);n.log("About to send an authorization request to this entry:",i),n.log("Options",e),t={response_type:this.config.getValue("response_type","token"),state:n.uuid()},e.hasOwnProperty("allowia")&&!e.allowia&&(t.prompt="none"),this.config.has("redirect_uri")&&(t.redirect_uri=this.config.getValue("redirect_uri","")),e.redirect_uri&&(t.redirect_uri=e.redirect_uri),t.client_id=a,(o=this._getRequestScopes(e)).length>0&&(t.scope=n.scopeList(o)),n.log("DEBUG REQUEST"),n.log(t),r=n.encodeURL(i,t),window.location.hash&&(t.restoreHash=window.location.hash),t.providerID=this.providerID,o&&(t.scopes=o),n.log("Saving state ["+t.state+"]"),n.log(JSON.parse(JSON.stringify(t)));var c=this.Loader;return e.hasOwnProperty("loader")&&(c=e.loader),n.log("Looking for loader",e,c),s.saveState(t.state,t),this.gotoAuthorizeURL(r,c).then(e=>this.callback(e))})}gotoAuthorizeURL(e,t){return new Promise(function(r,o){if(null!==t&&"function"==typeof t){var n=new t(e);if(!(n instanceof i))throw new Error("JSO selected Loader is not an instance of BasicLoader.");r(n.execute().then(function(e){return e}))}else o(new Error("Cannot redirect to authorization endpoint because of missing redirect handler"))})}wipeTokens(){s.wipeTokens(this.providerID)}request(e){var t=$.extend(!0,{},{dataType:"json"},e);return this.ajax(t).catch(function(t){if(t instanceof h.HTTPError){var r="HTTP status ("+t.jqXHR.status+"), JSO error on ["+e.url+"] "+t.jqXHR.textStatus;if(t.message=r,t.httpError=r,t.jqXHR.hasOwnProperty("responseText")&&"string"==typeof t.jqXHR.responseText)try{var o=JSON.parse(t.jqXHR.responseText);o.hasOwnProperty("message")&&(t.message=o.message),t.data=o}catch(e){e.message=e.message+". Unable to parse JSON response of this HTTP error."}}throw t})}ajax(e){var t=this,r=e.oauth||{};return this.getToken(r).then(function(o){if(o){if(null===o)throw new Error("Cannot perform AJAX call without a token.");return n.log("Ready. Got an token, and ready to perform an AJAX call",o),new Promise(function(s,i){r.allowia;e.error=function(e,r,o){n.log("error(jqXHR, textStatus, errorThrown)"),n.log(e),n.log(r),n.log(o),401===e.status&&(n.log("Token expired. About to delete this token"),t.wipeTokens(),i(new h.ExpiredTokenError({}).set("message","Token was expired and is now deleted. Try again.")));var s=new h.HTTPError({}).set("jqXHR",e).set("textStatus",r).set("errorThrown",o);i(s)},e.success=function(e){s(e)},"qs"===t.config.getValue("presenttoken",null)?(e.data||(e.data={}),e.data.access_token=o.access_token):(e.headers||(e.headers={}),e.headers.Authorization="Bearer "+o.access_token),n.log("$.ajax settings",e),h.$.ajax(e)})}n.log("No token no fun")})}inappbrowser(e){var t=this;return e=e||{},function(r,o){var s="_blank";e.hasOwnProperty("target")&&(s=e.target);n.log("About to open url "+r);var i=window.open(r,s,{});n.log("URL Loaded... "),i.addEventListener("loadstart",function(e){return function(r){var s=r.url;n.log("loadstop event triggered, and the url is now "+s),t.URLcontainsToken(s)&&(setTimeout(function(){e.close()},500),t.callback(s,function(){n.log("Closing window ",e),"function"==typeof o&&o()}))}}(i)),n.log("Event listeren ardded... ",i)}}URLcontainsToken(e){var t;if(e){if(-1===e.indexOf("#"))return!1;t=e.substring(e.indexOf("#"))}return!(t.length<2)&&-1!==t.indexOf("access_token")}info(){var e={};return e.version=l.version,e}}h.OAuthResponseError=class{constructor(e){for(var t in e)this[t]=e[t]}},h.ExpiredTokenError=class{constructor(e){for(var t in e)this[t]=e[t]}},h.HTTPError=class{constructor(e){for(var t in e)this[t]=e[t]}},Object.assign(h.prototype,new class{on(e,t){this._callbacks||(this._callbacks={}),this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t)}emit(e){this._callbacks||(this._callbacks={}),this._callbacks[e]||(this._callbacks[e]=[]);for(var t=Array.prototype.slice.call(arguments,1),r=0;r<this._callbacks[e].length;r++)this._callbacks[e][r].apply(this,t)}}({}))},function(e){e.exports={name:"jso",version:"4.0.0-rc.2",description:"OAuth 2.0 implementation in Javascript",main:"dist/JSO.js",module:"src/JSO.js",scripts:{test:"true",preversion:"npm test",version:"npm run build && git add -A dist",postversion:"git push && git push --tags && npm publish",build:"webpack --mode production"},repository:{type:"git",url:"https://github.com/andreassolberg/jso.git"},keywords:["oauth","authentication","authorization","rest","api","ajax","jquery"],files:["src"],eslintConfig:{env:{es6:!0,browser:!0,node:!1}},devDependencies:{qunit:"^2.5.1",webpack:"^4.1.1"},author:"Andreas Åkre Solberg",license:"LGPL-2.1",bugs:{url:"https://github.com/andreassolberg/jso/issues"},homepage:"https://github.com/andreassolberg/jso",dependencies:{"webpack-cli":"^2.0.12"}}}])});