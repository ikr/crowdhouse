# Pre-requisites

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
