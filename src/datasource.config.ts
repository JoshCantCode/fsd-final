import { DataSource } from "typeorm";
import "dotenv/config";

// I might be able to reuse this in app.module.ts but for now we leave it
//
export const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
  entities: ["dist/entities/*.entity.js"],
  synchronize: false,
  // migrations
  migrations: [__dirname + "/migrations/**/*{.js,.ts}"],
});
