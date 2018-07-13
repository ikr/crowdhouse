const {join} = require('path')
const {get, put, error} = require('server/router')
const {type, status, json} = require('server/reply')
const passwordHash = require('./passwordHash')

function notFound () {
    return status(404).send('No matching route found')
}

function max (s1, s2) {
    return s1 > s2 ? s1 : s2
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

                const newRData = Object.assign({}, rData, {
                    password_hash: newHash,
                    last_password_change: (new Date()).toISOString()
                })

                await rSet(
                    key,
                    JSON.stringify(newRData)
                )

                await pgQuery(
                    'update "Investor" set password_hash = $1, last_password_change = now() where id = $2',
                    [newHash, ctx.params.id]
                )

                return json({
                    name: newRData.name,
                    last_password_change: newRData.last_password_change
                })
            }
        ),

        get(
            '/users/:id',
            async ctx => {
                const rData = JSON.parse(await rGet(`Investors:${ctx.params.id}`))
                const {rows} = await pgQuery('select * from "Investor" where id = $1', [ctx.params.id])
                const pgData = rows[0]

                return json({
                    name: pgData.name,
                    last_password_change: max(
                        String(pgData.last_password_change),
                        rData.last_password_change
                    )
                })
            }
        ),

        get(notFound),
        put(notFound),
        error(ctx => status(500).type('text/plain').send(ctx.error))
    ]
}
