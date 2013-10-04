/**
 * CJS Style Main Module
 */

'use strict';

var add = require('./modules/add-browserify');
var subtract = require('./modules/subtract-browserify');

document.querySelector('.add').innerText = '2 + 1 = ' + add(2, 1);
document.querySelector('.subtract').innerText = '2 - 1 = ' + subtract(2, 1);

