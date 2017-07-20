## .editorconfig

EditorConfig is a file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs.

Supported by:
- IntellijIDEA
- WebStorm
- SourceLair
- RubyMine

Plugins for:
- Visual Studio Code
-- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- Atom
- ...
- list of plugins: http://editorconfig.org/#download

### Basic content
```
# top-most EditorConfig file
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

## Package Manager

Popular alternatives: bower, npm, JSPM

- install Node.js (which includes npm)
  Node.js is a set of libraries for JavaScript which allows it to be used outside of the browser. It is primarily focused on creating simple, easy to build network clients and servers.

- add package.json (manifest file for npm); e.g. ```npm init```
  - all binaries of node_modules/.bin are on the path for using inside scripts

- add Security Scanning
  - ```npm install -g nsp```
  - for manually check run ```nsp check```
  - add a script in package.json
    - ```
      {
        ...
        "scripts": {
          ...
          "security-check": "nsp check"
        }
      }
      ```

## Development Web Server

Popular alternatives:
- http-server: easy to use
- live-server: easy to use
- express: more advanced and production ready
- koa, hapi: like express
- budo: comes with browserify
- webpack dev server: comes with webpack
- browsersync: servers everywhere the same page; e.g. input in the desktop browser will be seen on mobile -> nice for cross-plattform testing

### install express
- ```npm install express --save-dev```
- install open ```npm install open --save-dev```
  - what is 'open'?: Open a file or url in the user's preferred application.
- add srcServer.js in buildScripts/
  - ```
    var express = require('express')
    var path = require('path')
    var open = require('open')

    var port = 8088
    var app = express()

    //any call to root (/)
    app.get('/', function(request, result){
      //__dirname holds the directory where the server is run in
      result.sendFile(path.join(__dirname, '../src/index.html'))
    })

    app.listen(port, function(error){
      if(error) {
        console.log(error)
      } else {
        open('http://localhost:' + port)
      }
    })
    ```
- run express ```node buildScripts/srcServer.js```

## set-up Sharing Work-in-progress

Popular alternatives:
- localtunnel: easily share work on your local machine
- ngrok: more setup but more security; needs an account on ngrok website
- Surge: only support static files
- now: deployment to the cloud

### local tunnel
- install ```npm install localtunnel --save-dev```
- add a npm script
  - ```
    {
      ...
      "scripts": {
        ...
        "share-by-localtunnel": "npm run lt -port 8088"
      }
    }
    ```
- run localtunnel _after_ running the server: ```npm run share-by-localtunnel```

## advanced scripting (with npm)

- install chalk: ```npm install chalk --save-dev```
  - Terminal string styling done right
- run a script before an other
  - use as a name _pre_[script]: e.g. prestart
- run a script after an other
  - use as a name _post_[script]: e.g. poststart
- run parallel
  - install npm-run-all: ```npm install npm-run-all --save-dev```
  - execute ```npm-run-all --parallel [script] [script] [...]```

## Transpiler

Popular alternatives:
- Babel: latest stable and experimental features of JS, transpiled down to ES5
- Typescript: adds type safety (supports ES6 and ES5) and interfaces
- Elm: transpiles to JS; complete new language (with a lot of benefits)

### Configuration of Babel
- either in .babelrc
  - no dependency to npm
- or in package.json
  - one less file
- presets are available to prevent unneccessary transpilation
  - e.g. babel-preset-es2015-node
  - e.g. babel-preset-latest-minimal

### install via npm
- ```npm install babel-cli babel-core babel-preset-latest babel-register --save-dev```

### .babelrc
- create in the root of the project the file _.babelrc_
- to use the latest features:
  ```
  {
    "presets": ["latest"]
  }
  ```

### in build scripts
- for node support use _babel-node_
  - ```
    {
      ...
      "scripts": {
          ...
          "prestart-dev-server": "babel-node buildScripts/startMessageSrcServer.js"
      },
      ...
    }
    ```

## Bundler
Popular alternatives:
- browserify
  - bundles JS code for browsers
  - many plugins (minification, linting, ...)
- webpack
  - can also bundle CSS, images, ...
  - built-in hot-reloading web server
  - tree shaking
- rollup
  - tree shaking
  - faster production code compared to webpack and browserify
  - good for library development
  - no hot-reloading
- JSPM
  - universal module loader
  - can also load modules during runtime
  - own package manager (i.e. it can use resources from npm, git, ...)
  - uses rollup

### install webpack
```npm install webpack webpack-middleware webpack-dev-server babel-loader --save-dev```
- webpack stuff
- babel-loader: babel-loader for webpack

### Webpack Configuration
- create a new folder ```webpack```
- create a new file ```webpack/webpack.config.dev.js```
  - ```
    import path from 'path'

    export default {
      devtool: 'inline-source-map',
      entry: [
        path.resolve(__dirname, '../src/index')
      ],
      target: 'web',
      output: {
        path: path.resolve(__dirname, '../src'),
        publicPath: '/',
        filename: 'bundle.js'
      },
      plugins: [],
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
          {test: /\.css$/, loaders: ['style-loader','css-loader']}
        ]
      }
    }
    ```
  - devtool: how to map bundled source back to original one
    - quality vs. speed
    - options
      - DEVELOPMENT
        - eval: Each module is executed with eval() and //@ sourceURL. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code.
        - inline-source-map: A SourceMap is added as a DataUrl to the bundle.
        - eval-source-map: Each module is executed with eval() and a SourceMap is added as a DataUrl to the eval(). Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code.
        - cheap-eval-source-map: Similar to _eval-source-map_, each module is executed with eval(). However, with this option the Source Map is passed as a Data URL to the eval() call. It is "cheap" because it doesn't have column mappings, it only maps line numbers.
        - cheap-module-eval-source-map: Similar to cheap-eval-source-map, however in this case this case loaders are able to process the mapping for better results.
      - PRODUCTION
        - source-map: A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.
        - hidden-source-map: Same as source-map, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.
        - cheap-source-map: A SourceMap without column-mappings ignoring loaded Source Maps.
        - cheap-module-source-map: A SourceMap without column-mappings that simplifies loaded Source Maps to a single mapping per line.
        - nosources-source-map: A SourceMap is created without the sourcesContent in it. It can be used to map stack traces on the client without exposing all of the source code.
  - entry point: application entry point
    - _path_ is used to get the full path; it comes with node; \_\_dirname is also part of _path_
  - target: for which platform the package will be bundled for
    - web, node, electron, ...
  - output: the location, where the bundle will be stored
    - *NOTE*: the development build will be served from memory and *no* physical files will be generated
  - plugins: webpack plugins
  - module: configuration which loader will be load what kind of files
    - different loaders are availble for different types: JS, CSS, HTML, ...

### Using bundled file in html
- remember to use the filename specified in _webpack.config.dev.js->output.filename_
  - in the example, this is _bundle.js_
  - ```<script src='bundle.js'></script>```

### Using CSS imports
- ```npm install style-loader css-loader```
- add loaders to webconfig
  - ```
    export default {
        ...
        module: {
          ...,
          {test: /\.css$/, loaders: ['style-loader','css-loader']}
        }
    }
    ```
- now you can import css files
  - e.g. ```import './index.css'```
- this approach will directly bundle the css file into the resulting \*.js file


### Debugging bundled
Sourcemaps maps bundled code back to the original source. They will only be
downloaded if you open the developer tools.
- add ```debugger``` as a breakpoint somewhere in the code
- open dev console in browser and then open your app
- this works in Chrome; Firefox seems not to support this feature
