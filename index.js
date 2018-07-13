#!/usr/bin/env node

const server = require('server')
const PgPool = require('pg').Pool
const redis = require('redis')
const {VError} = require('verror')
const newServer = require('./src/newServer')

if (process.argv.length < 3) {
    throw new Error('Usage: node ./index.js PORT_NUM')
}

const pgPool = new PgPool({connectionString: 'postgres://postgres@127.0.0.1/salesforce'})
const pgQuery = pgPool.query.bind(pgPool)
const rClient = redis.createClient()

server({port: parseInt(process.argv[2])}, newServer({pgQuery, rClient})).then(() => {
    console.log(`crowdhouse listening on port ${process.argv[2]}`)
}, error => {
    console.dir(new VError(error, 'Failed to start up the HTTP server'))
    process.exit(1)
})
