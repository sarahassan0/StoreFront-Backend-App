
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config();

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_TEST_NAME,
  NODE_ENV,
} = process.env

export let Database: Pool;

if (NODE_ENV === 'dev') {
  Database= new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}

else {
  Database= new Pool({
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}
