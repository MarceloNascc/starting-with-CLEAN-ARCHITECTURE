import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp({
  user: "postgres",
  password: "mysecretpassword",
  host: "localhost",
  port: 5432,
  database: 'parking-lot',
  idleTimeoutMillis: 100
});

export default db;
