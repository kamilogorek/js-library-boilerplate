;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * CJS Style Main Module
 */

'use strict';

var add = require('./modules/add-browserify');
var subtract = require('./modules/subtract-browserify');

document.querySelector('.add').innerText = '2 + 1 = ' + add(2, 1);
document.querySelector('.subtract').innerText = '2 - 1 = ' + subtract(2, 1);


},{"./modules/add-browserify":2,"./modules/subtract-browserify":3}],2:[function(require,module,exports){
/**
 * CJS Style Add Module
 * Module for adding two numbers
 */

'use strict';

module.exports = function (a, b) {
    return a + b;
};

},{}],3:[function(require,module,exports){
/**
 * CJS Style Subtract Module
 * Module for subtracting two numbers
 */

'use strict';

module.exports = function (a, b) {
    return a - b;
};

},{}]},{},[1])
;