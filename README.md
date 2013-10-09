## js-library-boilerplate
#### 0.0.1

Preconfigured boilerplate for writing JavaScript libraries.  

__This boilerplate consists of glued together:__  
* Grunt
* RequireJS with r.js build configuration
* Browserify with build configuration
* JSHint Linter with configured .jshintrc
* Uglify2 for building minified files
* LiveReload using Connect
* Watch

You're free to choose whether you want to use AMD (RequireJS) or CJS (Browserify) style modules definition and edit configs/sources so they'll fit your needs.

To use this stack, you've to run standard packages managers commands:
```
npm install
bower install
```

Available commands:
```
grunt server - run server without any modules watchers
grunt server:requirejs - run server with AMD modules compiled on runtime
grunt server:browserify - run server with CJS modules compiled on runtime
grunt build:requirejs - build uncompressed and compressed dist versions of your library using r.js compiler and uglify2
grunt build:browserify - build uncompressed and compressed dist versions of your library using browserify and uglify2
```

### Examples

#### RequireJS workflow:

__Adjust all necessary files (optional, but you get rid of unnecessary code):__
```
package.json
    - "grunt-browserify": "~1.2.8",
    - "browserify": "~2.33.1"

Gruntfile.js
    - var UglifyJS = require('uglify-js');

    - browserify: {
    -     files: ['src/**/*.js', '**/*.html', '**/*.css'],
    -     tasks: ['jshint', 'browserify:dev']
    - }

    - browserify: {
    -     dev: {
    -         files: {
    -             './src/main-browserify.js': ['./src/main-browserify.src.js'],
    -         }
    -     },
    -     build: {
    -         files: {
    -             './main.js': ['./src/main-browserify.src.js']
    -         },
    -         options: {
    -             postBundleCB: function (err, src, next) {
    -                 if (err) { throw err; }
    -                 console.log('\nλ Code compiled successfully!');
    - 
    -                 var modifiedSrc = banner + '(function () {' + src + '}).call(this);';
    -                 var minifiedSrc = banner + UglifyJS.minify(modifiedSrc, { fromString: true }).code;
    - 
    -                 fs.writeFileSync('main.min.js', minifiedSrc);
    -                 console.log('λ Code minified successfully!\n');
    - 
    -                 next(err, modifiedSrc);
    -             }
    -         }
    -     }
    - }

    - grunt.loadNpmTasks('grunt-browserify');

    - grunt.registerTask('server:browserify', function () {
    -     grunt.task.run(['browserify:dev', 'connect', 'watch:browserify']);
    - });

    - grunt.registerTask('build:browserify', ['jshint', 'browserify:build']);

- src/main-browserify.js
- src/main-browserify.src.js
- src/modules/add-browserify.js
- src/modules/subtract-browserify.js
```

__Adjust index.html so it'll use the right script file:__
```
+ <!-- Use for RequireJS dev process -->
+ <script data-main="src/main-requirejs.js" src="bower_components/requirejs/require.js"></script>

- <!-- Use for Browserify dev process -->
- <!-- <script src="src/main-browserify.js"></script> -->

- <!-- Use compiled script file -->
- <script src="main.js"></script>
```

__Run watcher:__
```
$ grunt server:requirejs
```

__Edit your files:__
```
$ vim src/main-requirejs.src.js
$ vim src/modules
```

__After finishing your project, build dist. and prod. versions:__
```
$ grunt build:requirejs
```

_Everything else is fully automatic, you don't have to worry about reloading nor recompiling your files._

__One note:__ You can work with require.js without using compiler straight away (but doing so, ensures you that your project will get compiled properly every time).

To do this, remove `main-requirejs.js` file and remove `.src` extension from `main-requirejs.src.js` file so it'll be the main one used now.
In Gruntfile.js change requirejs:build include/insert filename from:
`include: ['main-requirejs.src'], insertRequire: ['main-requirejs.src']` to `include: ['main-requirejs'], insertRequire: ['main-requirejs']`
(optionally you can remove requirejs:dev task config and initialization).
And run `$ grunt server` instead of `$ grunt server:requirejs` for development. Build stays the same.

#### Browserify workflow:

This workflow is almost identical to the RequireJS described above, but instead of removing Browserify config, we remove RequireJS:

__Adjust all necessary files (optional, but you get rid of unnecessary code):__
```
package.json
    - "grunt-contrib-requirejs": "~0.4.1",

    - requirejs: {
    -     files: ['src/**/*.js', '**/*.html', '**/*.css'],
    -     tasks: ['jshint', 'requirejs:dev']
    - },

    - requirejs: {
    -     dev: {
    -         options: {
    -             baseUrl: './src/',
    -             name: 'main-requirejs.src',
    -             out: './src/main-requirejs.js',
    -             findNestedDependencies: true,
    -             optimize: 'none'
    -         }
    -     },
    -     build: {
    -         options: {
    -             baseUrl: './src/',
    -             name: '../bower_components/almond/almond',
    -             include: ['main-requirejs.src'],
    -             insertRequire: ['main-requirejs.src'],
    -             out: './main.js',
    -             findNestedDependencies: true,
    -             optimize: 'none',
    -             preserveLicenseComments: false,
    -             done: function () {
    -                 console.log('\nλ Code compiled successfully!');
    - 
    -                 var minifiedSrc = banner + UglifyJS.minify('main.js').code;
    - 
    -                 fs.writeFileSync('main.min.js', minifiedSrc);
    -                 console.log('λ Code minified successfully!\n');
    -             },
    -             wrap: {
    -                 start: banner + '(function () {',
    -                 end: '}).call(this);'
    -             },
    -         }
    -     }
    - },

    - grunt.loadNpmTasks('grunt-contrib-requirejs');

    - grunt.registerTask('server', function () {
    -     grunt.task.run(['connect', 'watch:static']);
    - });

    - grunt.registerTask('build:requirejs', ['jshint', 'requirejs:build']);

- src/main-requirejs.js
- src/main-requirejs.src.js
- src/modules/add-requirejs.js
- src/modules/subtract-requirejs.js
```

__Adjust index.html so it'll use the right script file:__
```
- <!-- Use for RequireJS dev process -->
- <!-- <script data-main="src/main-requirejs.js" src="bower_components/requirejs/require.js"></script> -->

+ <!-- Use for Browserify dev process -->
+ <!-- <script src="src/main-browserify.js"></script> -->

- <!-- Use compiled script file -->
- <script src="main.js"></script>
```

__Run watcher:__
```
$ grunt server:browserify
```

__Edit your files:__
```
$ vim src/main-browserify.src.js
$ vim src/modules
```

__After finishing your project, build dist. and prod. versions:__
```
$ grunt build:browserify
```

_Everything else is fully automatic, you don't have to worry about reloading nor recompiling your files._

License: Public Domain  
2013 Kamil Ogórek
