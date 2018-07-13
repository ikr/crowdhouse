const {join} = require('path')
const {get, put, error} = require('server/router')
const {type, status, json} = require('server/reply')
const passwordHash = require('./passwordHash')

function notFound () {
    return status(404).send('No matching route found')
}

module.exports = function ({pgQuery, rGet, rSet}) {
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
            async ctx => {
                const key = `Investors:${ctx.params.id}`
                const newHash = await passwordHash(ctx.data.password)
                const rData = JSON.parse(await rGet(key))
                const newRData = Object.assign({}, rData, {password_hash: newHash})

                await rSet(
                    key,
                    JSON.stringify(newRData)
                )

                await pgQuery(
                    'update "Investor" set password_hash = $1 where id = $2',
                    [newHash, ctx.params.id]
                )

                return json(newRData)
            }
        ),

        get(
            '/users/:id',
            async ctx => {
                return type('applicaion/json').send(await rGet(`Investors:${ctx.params.id}`))
            }
        ),

        get(notFound),
        put(notFound),
        error(ctx => status(500).type('text/plain').send(ctx.error))
    ]
}
