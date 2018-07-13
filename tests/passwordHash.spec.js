const assert = require('assert')
const passwordHash = require('../src/passwordHash')

describe('passwordHash', () => {
    it('is a function', () => {
        assert.strictEqual(typeof passwordHash, 'function')
    })

    it('returns a hex string of length 256', async () => {
        assert(/^[a-f0-9]{64}$/.test(await passwordHash('monkey')))
    })
})
