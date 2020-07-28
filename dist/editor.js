window.protonLibraries=window.protonLibraries||{},window.protonLibraries["signature-phone"]=window.protonLibraries["signature-phone"]||{},window.protonLibraries["signature-phone"]["1.0.3"]=function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=9)}([function(t,e){t.exports=window.React},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,o){t.exports=o(7)()},function(t,e,o){"use strict";
/*!
 * Signature Pad v2.3.2
 * https://github.com/szimek/signature_pad
 *
 * Copyright 2017 Szymon Nowak
 * Released under the MIT license
 *
 * The main idea and some parts of the code (e.g. drawing variable width Bézier curve) are taken from:
 * http://corner.squareup.com/2012/07/smoother-signatures.html
 *
 * Implementation of interpolation using cubic Bézier curves is taken from:
 * http://benknowscode.wordpress.com/2012/09/14/path-interpolation-using-cubic-bezier-and-control-point-estimation-in-javascript
 *
 * Algorithm for approximated length of a Bézier curve is taken from:
 * http://www.lemoda.net/maths/bezier-length/index.html
 *
 */
function n(t,e,o){this.x=t,this.y=e,this.time=o||(new Date).getTime()}function r(t,e,o,n){this.startPoint=t,this.control1=e,this.control2=o,this.endPoint=n}function i(t,e){var o=this,n=e||{};this.velocityFilterWeight=n.velocityFilterWeight||.7,this.minWidth=n.minWidth||.5,this.maxWidth=n.maxWidth||2.5,this.throttle="throttle"in n?n.throttle:16,this.minDistance="minDistance"in n?n.minDistance:5,this.throttle?this._strokeMoveUpdate=function(t,e,o){var n,r,i,a=null,s=0;o||(o={});var u=function(){s=!1===o.leading?0:Date.now(),a=null,i=t.apply(n,r),a||(n=r=null)};return function(){var c=Date.now();s||!1!==o.leading||(s=c);var l=e-(c-s);return n=this,r=arguments,l<=0||l>e?(a&&(clearTimeout(a),a=null),s=c,i=t.apply(n,r),a||(n=r=null)):a||!1===o.trailing||(a=setTimeout(u,l)),i}}(i.prototype._strokeUpdate,this.throttle):this._strokeMoveUpdate=i.prototype._strokeUpdate,this.dotSize=n.dotSize||function(){return(this.minWidth+this.maxWidth)/2},this.penColor=n.penColor||"black",this.backgroundColor=n.backgroundColor||"rgba(0,0,0,0)",this.onBegin=n.onBegin,this.onEnd=n.onEnd,this._canvas=t,this._ctx=t.getContext("2d"),this.clear(),this._handleMouseDown=function(t){1===t.which&&(o._mouseButtonDown=!0,o._strokeBegin(t))},this._handleMouseMove=function(t){o._mouseButtonDown&&o._strokeMoveUpdate(t)},this._handleMouseUp=function(t){1===t.which&&o._mouseButtonDown&&(o._mouseButtonDown=!1,o._strokeEnd(t))},this._handleTouchStart=function(t){if(1===t.targetTouches.length){var e=t.changedTouches[0];o._strokeBegin(e)}},this._handleTouchMove=function(t){t.preventDefault();var e=t.targetTouches[0];o._strokeMoveUpdate(e)},this._handleTouchEnd=function(t){t.target===o._canvas&&(t.preventDefault(),o._strokeEnd(t))},this.on()}o.r(e),n.prototype.velocityFrom=function(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):1},n.prototype.distanceTo=function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))},n.prototype.equals=function(t){return this.x===t.x&&this.y===t.y&&this.time===t.time},r.prototype.length=function(){for(var t=0,e=void 0,o=void 0,n=0;n<=10;n+=1){var r=n/10,i=this._point(r,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),a=this._point(r,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(n>0){var s=i-e,u=a-o;t+=Math.sqrt(s*s+u*u)}e=i,o=a}return t},r.prototype._point=function(t,e,o,n,r){return e*(1-t)*(1-t)*(1-t)+3*o*(1-t)*(1-t)*t+3*n*(1-t)*t*t+r*t*t*t},i.prototype.clear=function(){var t=this._ctx,e=this._canvas;t.fillStyle=this.backgroundColor,t.clearRect(0,0,e.width,e.height),t.fillRect(0,0,e.width,e.height),this._data=[],this._reset(),this._isEmpty=!0},i.prototype.fromDataURL=function(t){var e=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new Image,r=o.ratio||window.devicePixelRatio||1,i=o.width||this._canvas.width/r,a=o.height||this._canvas.height/r;this._reset(),n.src=t,n.onload=function(){e._ctx.drawImage(n,0,0,i,a)},this._isEmpty=!1},i.prototype.toDataURL=function(t){var e;switch(t){case"image/svg+xml":return this._toSVG();default:for(var o=arguments.length,n=Array(o>1?o-1:0),r=1;r<o;r++)n[r-1]=arguments[r];return(e=this._canvas).toDataURL.apply(e,[t].concat(n))}},i.prototype.on=function(){this._handleMouseEvents(),this._handleTouchEvents()},i.prototype.off=function(){this._canvas.removeEventListener("mousedown",this._handleMouseDown),this._canvas.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp),this._canvas.removeEventListener("touchstart",this._handleTouchStart),this._canvas.removeEventListener("touchmove",this._handleTouchMove),this._canvas.removeEventListener("touchend",this._handleTouchEnd)},i.prototype.isEmpty=function(){return this._isEmpty},i.prototype._strokeBegin=function(t){this._data.push([]),this._reset(),this._strokeUpdate(t),"function"==typeof this.onBegin&&this.onBegin(t)},i.prototype._strokeUpdate=function(t){var e=t.clientX,o=t.clientY,n=this._createPoint(e,o),r=this._data[this._data.length-1],i=r&&r[r.length-1],a=i&&n.distanceTo(i)<this.minDistance;if(!i||!a){var s=this._addPoint(n),u=s.curve,c=s.widths;u&&c&&this._drawCurve(u,c.start,c.end),this._data[this._data.length-1].push({x:n.x,y:n.y,time:n.time,color:this.penColor})}},i.prototype._strokeEnd=function(t){var e=this.points.length>2,o=this.points[0];if(!e&&o&&this._drawDot(o),o){var n=this._data[this._data.length-1],r=n[n.length-1];o.equals(r)||n.push({x:o.x,y:o.y,time:o.time,color:this.penColor})}"function"==typeof this.onEnd&&this.onEnd(t)},i.prototype._handleMouseEvents=function(){this._mouseButtonDown=!1,this._canvas.addEventListener("mousedown",this._handleMouseDown),this._canvas.addEventListener("mousemove",this._handleMouseMove),document.addEventListener("mouseup",this._handleMouseUp)},i.prototype._handleTouchEvents=function(){this._canvas.style.msTouchAction="none",this._canvas.style.touchAction="none",this._canvas.addEventListener("touchstart",this._handleTouchStart),this._canvas.addEventListener("touchmove",this._handleTouchMove),this._canvas.addEventListener("touchend",this._handleTouchEnd)},i.prototype._reset=function(){this.points=[],this._lastVelocity=0,this._lastWidth=(this.minWidth+this.maxWidth)/2,this._ctx.fillStyle=this.penColor},i.prototype._createPoint=function(t,e,o){var r=this._canvas.getBoundingClientRect();return new n(t-r.left,e-r.top,o||(new Date).getTime())},i.prototype._addPoint=function(t){var e=this.points;if(e.push(t),e.length>2){3===e.length&&e.unshift(e[0]);var o=this._calculateCurveControlPoints(e[0],e[1],e[2]).c2,n=this._calculateCurveControlPoints(e[1],e[2],e[3]).c1,i=new r(e[1],o,n,e[2]),a=this._calculateCurveWidths(i);return e.shift(),{curve:i,widths:a}}return{}},i.prototype._calculateCurveControlPoints=function(t,e,o){var r=t.x-e.x,i=t.y-e.y,a=e.x-o.x,s=e.y-o.y,u=(t.x+e.x)/2,c=(t.y+e.y)/2,l=(e.x+o.x)/2,h=(e.y+o.y)/2,p=Math.sqrt(r*r+i*i),d=Math.sqrt(a*a+s*s),f=d/(p+d),y=l+(u-l)*f,v=h+(c-h)*f,m=e.x-y,_=e.y-v;return{c1:new n(u+m,c+_),c2:new n(l+m,h+_)}},i.prototype._calculateCurveWidths=function(t){var e=t.startPoint,o=t.endPoint,n={start:null,end:null},r=this.velocityFilterWeight*o.velocityFrom(e)+(1-this.velocityFilterWeight)*this._lastVelocity,i=this._strokeWidth(r);return n.start=this._lastWidth,n.end=i,this._lastVelocity=r,this._lastWidth=i,n},i.prototype._strokeWidth=function(t){return Math.max(this.maxWidth/(t+1),this.minWidth)},i.prototype._drawPoint=function(t,e,o){var n=this._ctx;n.moveTo(t,e),n.arc(t,e,o,0,2*Math.PI,!1),this._isEmpty=!1},i.prototype._drawCurve=function(t,e,o){var n=this._ctx,r=o-e,i=Math.floor(t.length());n.beginPath();for(var a=0;a<i;a+=1){var s=a/i,u=s*s,c=u*s,l=1-s,h=l*l,p=h*l,d=p*t.startPoint.x;d+=3*h*s*t.control1.x,d+=3*l*u*t.control2.x,d+=c*t.endPoint.x;var f=p*t.startPoint.y;f+=3*h*s*t.control1.y,f+=3*l*u*t.control2.y,f+=c*t.endPoint.y;var y=e+c*r;this._drawPoint(d,f,y)}n.closePath(),n.fill()},i.prototype._drawDot=function(t){var e=this._ctx,o="function"==typeof this.dotSize?this.dotSize():this.dotSize;e.beginPath(),this._drawPoint(t.x,t.y,o),e.closePath(),e.fill()},i.prototype._fromData=function(t,e,o){for(var r=0;r<t.length;r+=1){var i=t[r];if(i.length>1)for(var a=0;a<i.length;a+=1){var s=i[a],u=new n(s.x,s.y,s.time),c=s.color;if(0===a)this.penColor=c,this._reset(),this._addPoint(u);else if(a!==i.length-1){var l=this._addPoint(u),h=l.curve,p=l.widths;h&&p&&e(h,p,c)}}else this._reset(),o(i[0])}},i.prototype._toSVG=function(){var t=this,e=this._data,o=this._canvas,n=Math.max(window.devicePixelRatio||1,1),r=o.width/n,i=o.height/n,a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttributeNS(null,"width",o.width),a.setAttributeNS(null,"height",o.height),this._fromData(e,(function(t,e,o){var n=document.createElement("path");if(!(isNaN(t.control1.x)||isNaN(t.control1.y)||isNaN(t.control2.x)||isNaN(t.control2.y))){var r="M "+t.startPoint.x.toFixed(3)+","+t.startPoint.y.toFixed(3)+" C "+t.control1.x.toFixed(3)+","+t.control1.y.toFixed(3)+" "+t.control2.x.toFixed(3)+","+t.control2.y.toFixed(3)+" "+t.endPoint.x.toFixed(3)+","+t.endPoint.y.toFixed(3);n.setAttribute("d",r),n.setAttribute("stroke-width",(2.25*e.end).toFixed(3)),n.setAttribute("stroke",o),n.setAttribute("fill","none"),n.setAttribute("stroke-linecap","round"),a.appendChild(n)}}),(function(e){var o=document.createElement("circle"),n="function"==typeof t.dotSize?t.dotSize():t.dotSize;o.setAttribute("r",n),o.setAttribute("cx",e.x),o.setAttribute("cy",e.y),o.setAttribute("fill",e.color),a.appendChild(o)}));var s='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 '+r+" "+i+'" width="'+r+'" height="'+i+'">',u=a.innerHTML;if(void 0===u){var c=document.createElement("dummy"),l=a.childNodes;c.innerHTML="";for(var h=0;h<l.length;h+=1)c.appendChild(l[h].cloneNode(!0));u=c.innerHTML}return"data:image/svg+xml;base64,"+btoa(s+u+"</svg>")},i.prototype.fromData=function(t){var e=this;this.clear(),this._fromData(t,(function(t,o){return e._drawCurve(t,o.start,o.end)}),(function(t){return e._drawDot(t)})),this._data=t},i.prototype.toData=function(){return this._data},e.default=i},function(t,e,o){(function(t){var o,n,r,i;function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i=function(){return function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e){"use strict";function o(t,e,o,n){return function(t,e,o,n){return{red:n[4*(o*e+t)],green:n[4*(o*e+t)+1],blue:n[4*(o*e+t)+2],alpha:n[4*(o*e+t)+3]}}(t,e,o,n).alpha}function n(t,e,n,r){for(var i=t?1:-1,a=t?0:n-1;t?a<n:a>-1;a+=i)for(var s=0;s<e;s++)if(o(s,a,e,r))return a;return null}function r(t,e,n,r){for(var i=t?1:-1,a=t?0:e-1;t?a<e:a>-1;a+=i)for(var s=0;s<n;s++)if(o(a,s,e,r))return a;return null}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.getContext("2d"),o=t.width,i=t.height,a=e.getImageData(0,0,o,i).data,s=n(!0,o,i,a),u=n(!1,o,i,a),c=r(!0,o,i,a),l=r(!1,o,i,a)-c+1,h=u-s+1,p=e.getImageData(c,s,l,h);return t.width=l,t.height=h,e.clearRect(0,0,l,h),e.putImageData(p,0,0),t}}])},"object"==a(e)&&"object"==a(t)?t.exports=i():(n=[],void 0===(r="function"==typeof(o=i)?o.apply(e,n):o)||(t.exports=r))}).call(this,o(1)(t))},function(t,e,o){(function(t){var n,r,i;function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(s,u){"object"==a(e)&&"object"==a(t)?t.exports=u(o(2),o(0),o(3),o(4)):(r=[o(2),o(0),o(3),o(4)],void 0===(i="function"==typeof(n=u)?n.apply(e,r):n)||(t.exports=i))}(0,(function(t,e,o,n){return function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var o={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(o[n]=t[n]);return o}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=a(e)&&"function"!=typeof e?t:e}Object.defineProperty(e,"__esModule",{value:!0});var u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},c=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),l=n(o(1)),h=o(2),p=n(h),d=n(o(3)),f=n(o(4)),y=function(t){function e(){var t,o,n;i(this,e);for(var a=arguments.length,u=Array(a),c=0;c<a;c++)u[c]=arguments[c];return o=n=s(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(u))),n._sigPad=null,n._excludeOurProps=function(){var t=n.props;return t.canvasProps,t.clearOnResize,r(t,["canvasProps","clearOnResize"])},n.getCanvas=function(){return n._canvas},n.getTrimmedCanvas=function(){var t=document.createElement("canvas");return t.width=n._canvas.width,t.height=n._canvas.height,t.getContext("2d").drawImage(n._canvas,0,0),(0,f.default)(t)},n.getSignaturePad=function(){return n._sigPad},n._checkClearOnResize=function(){n.props.clearOnResize&&n._resizeCanvas()},n._resizeCanvas=function(){var t=n.props.canvasProps||{},e=t.width,o=t.height;if(!e||!o){var r=n._canvas,i=Math.max(window.devicePixelRatio||1,1);e||(r.width=r.offsetWidth*i),o||(r.height=r.offsetHeight*i),r.getContext("2d").scale(i,i),n.clear()}},n.on=function(){return window.addEventListener("resize",n._checkClearOnResize),n._sigPad.on()},n.off=function(){return window.removeEventListener("resize",n._checkClearOnResize),n._sigPad.off()},n.clear=function(){return n._sigPad.clear()},n.isEmpty=function(){return n._sigPad.isEmpty()},n.fromDataURL=function(t,e){return n._sigPad.fromDataURL(t,e)},n.toDataURL=function(t,e){return n._sigPad.toDataURL(t,e)},n.fromData=function(t){return n._sigPad.fromData(t)},n.toData=function(){return n._sigPad.toData()},s(n,o)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+a(e));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),c(e,[{key:"componentDidMount",value:function(){this._sigPad=new d.default(this._canvas,this._excludeOurProps()),this._resizeCanvas(),this.on()}},{key:"componentWillUnmount",value:function(){this.off()}},{key:"componentDidUpdate",value:function(){Object.assign(this._sigPad,this._excludeOurProps())}},{key:"render",value:function(){var t=this,e=this.props.canvasProps;return p.default.createElement("canvas",u({ref:function(e){t._canvas=e}},e))}}]),e}(h.Component);y.propTypes={velocityFilterWeight:l.default.number,minWidth:l.default.number,maxWidth:l.default.number,minDistance:l.default.number,dotSize:l.default.oneOfType([l.default.number,l.default.func]),penColor:l.default.string,throttle:l.default.number,onEnd:l.default.func,onBegin:l.default.func,canvasProps:l.default.object,clearOnResize:l.default.bool},y.defaultProps={clearOnResize:!0},e.default=y},function(e,o){e.exports=t},function(t,o){t.exports=e},function(t,e){t.exports=o},function(t,e){t.exports=n}])}))}).call(this,o(1)(t))},function(t,e){t.exports=window.ReactNative},function(t,e,o){"use strict";var n=o(8);function r(){}function i(){}i.resetWarningCache=r,t.exports=function(){function t(t,e,o,r,i,a){if(a!==n){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function e(){return t}t.isRequired=t;var o={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:r};return o.PropTypes=o,o}},function(t,e,o){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,o){"use strict";o.r(e),o.d(e,"components",(function(){return y})),o.d(e,"config",(function(){return v}));var n=o(0),r=o.n(n),i=o(5),a=o.n(i),s=o(6);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=d(t);if(e){var r=d(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return h(this,o)}}function h(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?p(t):e}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var y={SignaturePhone:function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(o,t);var e=l(o);function o(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),f(p(n=e.call(this,t)),"styles",{wrapper:{borderColor:n.props.borderColor,backgroundColor:n.props.backgroundColor,borderStyle:"solid",borderWidth:2,display:"flex",alignItems:"center",justifyContent:"center"},div:{width:"100%",backgroundColor:n.props.buttonBackgroundColor},clearButton:{width:"50%",height:"20%",backgroundColor:n.props.buttonBackgroundColor,border:"1px solid",borderColor:n.props.borderColor,borderBottom:"0",margin:"auto",display:"block",float:"left",color:n.props.buttonTextColor,padding:5},saveButton:{width:"50%",height:"20%",backgroundColor:n.props.buttonBackgroundColor,border:"1px solid",borderColor:n.props.borderColor,borderBottom:"0",margin:"auto",display:"block",float:"right",color:n.props.buttonTextColor,padding:5}}),f(p(n),"state",{trimmedDataURL:null,height:n.props._height,width:n.props._width,buttonHeight:0}),f(p(n),"sigPad",{}),f(p(n),"clear",(function(){n.sigPad.clear()})),f(p(n),"trim",(function(){var t=n.sigPad.getTrimmedCanvas().toDataURL("image/png");n.setState({trimmedDataURL:t});var e=n.props.imageOutputAction;e&&e(t),n.clear()})),f(p(n),"componentDidMount",(function(){n.viewRef.clientHeight,n.viewRef.clientWidth;n.setState({componentHeight:n.props._height,componentWidth:n.props._width})})),f(p(n),"render",(function(){var t=n.props,e=(t.backgroundColor,t.penColor,t.borderColor,t.buttonTextColor,t.buttonBackgroundColor,n.state.trimmedDataURL,n.props._height-32);return r.a.createElement(s.View,{ref:n.viewRef,style:n.styles.wrapper,key:"view.".concat(n.state._height+n.state._width)},r.a.createElement("div",null,r.a.createElement(a.a,{penColor:n.props.penColor,ref:function(t){n.sigPad=t},canvasProps:{width:n.props._width,height:e,className:"sigCanvas"},key:"sigCanvas.".concat(n.props.backgroundColor+n.props.penColor)})),r.a.createElement("div",{style:n.styles.div,className:"button-div"},r.a.createElement("button",{style:n.styles.clearButton,className:"clear-btn",onClick:n.clear,key:"clearButton.".concat(n.props.buttonBackgroundColor+n.props.buttonTextColor)},n.props.clearText),r.a.createElement("button",{style:n.styles.saveButton,className:"save-btn",onClick:n.trim},n.props.saveText)))})),n.viewRef=r.a.createRef(),n}return o}(n.Component)},v={displayName:"Signature",logo:"./logo.png",name:"signature-phone",version:"1.0.3",components:[{name:"SignaturePhone",displayName:"Signature Phone",defaultWidth:250,defaultHeight:160,props:[{name:"backgroundColor",displayName:"Background Color",type:"color",default:"#ffffff"},{name:"penColor",displayName:"Pen Color",type:"color",default:"#000000"},{name:"buttonBackgroundColor",displayName:"Button Background Color",type:"color",default:"@primary"},{name:"clearText",displayName:"Clear Button Text",type:"text",default:"Clear"},{name:"saveText",displayName:"Save Button Text",type:"text",default:"Save"},{name:"buttonTextColor",displayName:"Button Text Color",type:"color",default:"@contrast:buttonBackgroundColor"},{name:"borderColor",displayName:"Border Color",type:"color",default:"#000000"},{name:"imageOutputAction",displayName:"Action on Saved Signature",type:"action",arguments:[{type:"text",displayName:"Signature Image"}]}],resizeX:!0,resizeY:!0}]}}]);