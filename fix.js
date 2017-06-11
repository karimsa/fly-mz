/**
 * @file fix.js
 * @license MIT
 * @copyright 2017 Karim Alibhai
 */

const fs = require('fs')
    , path = require('path')

// find-up
function find(file, dir) {
  const files = fs.readdirSync(dir).filter(f => {
    return f === file
  })

  if (files.length === 0 && dir === '/') {
    throw new Error('Unable to find package.json')
  }

  return files.length === 1 ? dir : find(file, path.dirname(dir))
}

const cwd = find('package.json', path.dirname(__dirname))
console.log('Setting project directory: %s', cwd)

// look for fly-esnext for conflicts
if (fs.existsSync(`${cwd}/node_modules/fly-esnext`)) {
  console.error('Error: found fly-esnext to already exist. Please remove it from the project before continuing.')
  process.exit(-1)
}

// create symlink
fs.symlinkSync(
  `${cwd}/node_modules/fly-mz`,
  `${cwd}/node_modules/fly-esnext`
)