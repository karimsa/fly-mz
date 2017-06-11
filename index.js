/**
 * @file index.js
 * @license MIT
 * @copyright 2017 Karim Alibhai
 */

const babel = require('babel-core')
    , env = require('babel-preset-env')
    , { Script } = require('vm')
    , { dirname } = require('path')
    , req = require('require-like')

module.exports = function (file, data) {
  // stay silent if fly attempts to load as a plugin
  if ( typeof file === 'object' && file === this ) {
    return
  }

  // if bad args otherwise, die
  if ( typeof file !== 'string' || typeof data !== 'string' ) {
    throw new Error('Unknown arguments')
  }

  // compile with babel
  const { code } = babel.transform(data, {
    babelrc: false,
    presets: [
      [env, {
        targets: {
          node: 'current'
        }
      }]
    ]
  })

  // setup virtual script
  const script = new Script(
    `(function (exports, require, module, __filename, __dirname) {
      ${code}
     }(scope.exports, scope.require, scope.module, scope.__filename, scope.__dirname))`
  )

  try {
    // setup mock scope
    const scopeExports = {}
        , scope = {
            module: {
              exports: scopeExports
            },
            exports: scopeExports,
            require: req(file),

            __dirname: dirname(file),
            __filename: file
          }

    // expose to script
    global.scope = scope

    // run script
    script.runInThisContext({
      filename: file
    })

    // clean global scope
    delete global.scope

    // return exports
    return scope.module.exports
  } catch (err) {
    // this is a crappy fix but it's the only
    // way to handle errors because Fly allows fly-esnext
    // to error out
    console.error(err)
    process.exit(-1)
  }
}