/**
 * AMD Style Main Module
 */

'use strict';

require(['modules/add-requirejs', 'modules/subtract-requirejs'], function(add, subtract) {
    document.querySelector('.add').innerText = '2 + 1 = ' + add(2, 1);
    document.querySelector('.subtract').innerText = '2 - 1 = ' + subtract(2, 1);
});
