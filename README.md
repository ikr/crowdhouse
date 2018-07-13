# Pre-requisites

* PostgreSQL server
  * listening on the standard port on host 127.0.0.1
  * no password for the DB user `postgres` required
* Redis server listening on the standard port on host 127.0.0.1

# Setup

* Create the dummy "salesforce" relational DB with `./bin/saleseforce`
  * the database schema will be created
  * the table investors will be pre-filled with some test data
* Start the application HTTP server with `./index 1337`

# API
