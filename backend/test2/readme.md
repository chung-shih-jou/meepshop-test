## Getting Started with Installing module

### `yarn install`

### `yarn docker`

Runs the app in the docker mode.\

## Getting test of unit test and integration test

### `integration test`

Test [http://localhost:13000](http://localhost:13000) in integration-test from `yarn test`.

### `unit test`

Test [http://localhost:13000](http://localhost:13000) in unit-test from /rest-api-test/unit-test.http.

First should be setup table.
Use withdraw and deposit money by id.
Or Transfer money by ids.

## Framework explain

### server.js

The main code in bank problem.

### rest-api-test folder

Test for unit-test and integration test

### service folder

The method get api from pg database.

### db.js

The pg database config and connection.
