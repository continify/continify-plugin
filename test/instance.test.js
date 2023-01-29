const tap = require('tap')
const Continify = require('continify')
const ContinifyPlugin = require('..')

tap.test('instance test', async t => {
  const ins = Continify()
  t.plan(2)
  ins.register(
    ContinifyPlugin(async (p1, option) => {
      t.equal(p1.$fullname, 'root')
    })
  )
  ins.register(
    ContinifyPlugin(
      async (p2, option) => {
        t.equal(p2.$fullname, 'root.aaa')
      },
      {
        name: 'aaa'
      }
    )
  )
  await ins.ready()
  await ins.close()
})

tap.test('instance throw error: not function', async t => {
  const ins = Continify()
  t.plan(1)
  const invalidPlugin = 'not function'
  try {
    ins.register(ContinifyPlugin(invalidPlugin))
  } catch (err) {
    t.equal(
      err.message,
      `fn expects a function, instead got a '${typeof invalidPlugin}'`
    )
  }
  await ins.ready()
  await ins.close()
})

tap.test('instance throw error: version not match', async t => {
  const ins = Continify()
  t.plan(1)
  const invalidVersion = '9.9.9'
  try {
    ins.register(ContinifyPlugin(() => {}, { continify: invalidVersion }))
  } catch (err) {
    t.equal(err.message, `expected '${invalidVersion}', '0.1.1' is installed`)
  }
  await ins.ready()
  await ins.close()
})
