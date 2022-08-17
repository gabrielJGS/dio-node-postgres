import "reflect-metadata";
require("dotenv/config");
import { DataSource } from "typeorm";
import { User } from "../entities/User";
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DB } = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_DB,
  entities: [User],
  synchronize: true,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

AppDataSource.initialize().catch((error) => console.log(error));

export { AppDataSource };
