const {join} = require('path')
const {get} = require('server/router')
const {type} = require('server/reply')

module.exports = function () {
    return [
        get(
            '/doc',
            () => type('text/plain').download(
                join(__dirname, '../README.md'),
                'README.md'
            )
        )
    ]
}
