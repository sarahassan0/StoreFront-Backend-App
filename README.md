# Storefront Backend Project



## Prerequisites
Your machine must have the following installed on it:
- [Node/NPM](v16.13.0) (8.1.0)


## Install Dependencies

```
npm install
```


## Database Setup (postgresSQL)

- Database info:

* Host: 127.0.0.1
* Database user: "project"
* Database name: "the_project"
* Test database name: "the_project_test"

- Database setup:

```
  CREATE USER project WITH PASSWORD 'pass111' SUPERUSER;
  CREATE DATABASE the_project OWNER project ENCODING UTF8; 
  CREATE DATABASE the_project_test OWNER project ENCODING UTF8; 
 
```


## Environment variables

* Create a .env file and copy the following into it:

```
NODE_ENV=dev

DP_PORT=5432
DB_HOST=127.0.0.1
DB_NAME=the_project
DB_TEST_NAME=the_project_test
DB_USER=project
DB_PASSWORD=pass111
JWT_SECRET = my_secret

```

### 2.  DB Creation and Migrations


``` 
npm run migrate:up
```

### 3. Starting the project
```
npm start
```

### 4. Running the tests
```
npm test
```

Any by now you should be able to go to `localhost:8000` to test that everything is working as expected.