const semver = require('semver')
const { kContinifyPluginOptions } = require('./symbols')

function wrapper (fn, options = {}) {
  if (typeof fn !== 'function') {
    throw new Error(`fn expects a function, instead got a '${typeof fn}'`)
  }

  const expectedVersion = options.continify || '>=0.1.1'
  const version = require('continify/package.json').version
  if (!semver.satisfies(version, expectedVersion)) {
    throw new Error(`expected '${expectedVersion}', '${version}' is installed`)
  }

  fn[kContinifyPluginOptions] = options
  return fn
}

module.exports = wrapper
module.exports.default = wrapper
