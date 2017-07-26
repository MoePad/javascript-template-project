require('ts-node').register({
    "compileOnSave": false,
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "lib": [
            "dom",
            "es2015",
            "es2016"
        ],
        "jsx": "preserve",
        "target": "es2016",
        "module": "commonjs",
        "moduleResolution": "node",
        "noImplicitAny": false,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "removeComments": false,
        "preserveConstEnums": true,
        "sourceMap": true,
        "skipLibCheck": true,
        "experimentalDecorators": true
    },
    "exclude": [
      "node_modules"
    ],
    "include": [
        "./src/**/*"
    ]
})
require('babel-register')() //register babel for transpiling before running tests

require.extensions['.css'] = function(){} //disable webpack features, that mocha doesn't understand (i.e. importing css)
