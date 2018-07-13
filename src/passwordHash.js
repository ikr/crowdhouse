const crypto = require('crypto')
const {promisify} = require('util')
const pbkdf2 = promisify(crypto.pbkdf2)

const SALT = '%$&%$RTFGHJBKHJHFYTID$%^&*'

module.exports = function (password) {
    return pbkdf2(password, SALT, 100000, 32, 'sha512').then(
        derivedKey => derivedKey.toString('hex')
    )
}
