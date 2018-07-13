const {join} = require('path')
const {get, put, error} = require('server/router')
const {type, status, send} = require('server/reply')
const passwordHash = require('./passwordHash')

function notFound () {
    return status(404).send('No matching route found')
}

module.exports = function ({pgQuery, rGetAsync}) {
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
                const rData = await rGetAsync(`Investors:${ctx.params.id}`)

                console.dir(rData)

                await pgQuery(
                    'update "Investor" set password_hash = $1 where id = $2',
                    [await passwordHash(ctx.data.password), ctx.params.id]
                )

                return send('---')
            }
        ),

        get(
            '/users/:id',
            async ctx => {
                return type('applicaion/json').send(await rGetAsync(`Investors:${ctx.params.id}`))
            }
        ),

        get(notFound),
        put(notFound),
        error(ctx => status(500).type('text/plain').send(ctx.error))
    ]
}
