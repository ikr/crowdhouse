#!/usr/bin/env node

const server = require('server')
const PgPool = require('pg').Pool
const {VError} = require('verror')
const newServer = require('./src/newServer')

if (process.argv.length < 3) {
    throw new Error('Usage: node ./index.js PORT_NUM')
}

const pgPool = new PgPool({connectionString: 'postgres://postgres@127.0.0.1/salesforce'})

server({port: parseInt(process.argv[2])}, newServer({pgPool})).then(() => {
    console.log(`ota-access listening on port ${process.argv[2]}`)
}, error => {
    console.dir(new VError(error, 'Failed to start up the HTTP server'))
    process.exit(1)
})
