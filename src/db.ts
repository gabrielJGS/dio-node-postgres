import { Pool } from "pg";

const connectionString = "postgres://postgres:postgrespw@localhost:49153/node_user";

const db = new Pool({ connectionString });

export default db;
