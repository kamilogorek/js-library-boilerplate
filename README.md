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

License: Public Domain  
2013 Kamil Ogórek
