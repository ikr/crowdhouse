const {join} = require('path')
const {get, put, error} = require('server/router')
const {type, status, send} = require('server/reply')

function notFound () {
    return status(404).send('No matching route found')
}

module.exports = function ({pgQuery, rClient}) {
    return [
        get(
            '/doc',
            () => type('text/plain').download(
                join(__dirname, '../README.md'),
                'README.md'
            )
        ),

        put(
            '/users/:id',
            ctx => {
                console.log(111111111111)
                return send('ssss')
            }
        ),

        get(notFound),
        put(notFound),
        error(ctx => status(500).type('text/plain').send(ctx.error.trace))
    ]
}
