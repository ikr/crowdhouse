# Pre-requisites

* Node.js v8+
* PostgreSQL server
  * listening on the standard port on host 127.0.0.1
  * no password for the DB user `postgres` required
* Redis server listening on the standard port on host 127.0.0.1

# Setup

* Create the dummy "salesforce" relational database with `./bin/salesforce`
  * the database schema will be created
  * the table investors will be pre-filled with some test data
* Create the dummy "unified" database with `./bin/unidb`
* Start the application HTTP server with `./index 1337`

# API

```
$ curl -s -H 'Content-Type: application/json' -X PUT -d '{"password":"woo"}' http://localhost:1337/users/202
…
$ curl -s http://localhost:1337/users/202
```
