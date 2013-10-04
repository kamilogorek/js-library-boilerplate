
/**
 * AMD Style Add Module
 * Module for adding two numbers
 */



define('modules/add-requirejs',[], function () {
    return function (a, b) {
        return a + b;
    };
});

/**
 * AMD Style Subtract Module
 * Module for subtracting two numbers
 */



define('modules/subtract-requirejs',[], function () {
    return function (a, b) {
        return a - b;
    };
});

/**
 * AMD Style Main Module
 */



require(['modules/add-requirejs', 'modules/subtract-requirejs'], function(add, subtract) {
    document.querySelector('.add').innerText = '2 + 1 = ' + add(2, 1);
    document.querySelector('.subtract').innerText = '2 - 1 = ' + subtract(2, 1);
});

define("main-requirejs.src", function(){});
