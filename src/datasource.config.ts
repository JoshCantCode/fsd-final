import { DataSource } from "typeorm";
import "dotenv/config";

// I might be able to reuse this in app.module.ts but for now we leave it
export const datasource = new DataSource({
  logging: true,
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
  entities: ["dist/**/*.entity.js"],
  synchronize: false,

  // migrations
  migrations: ["src/migrations/**/*{.js,.ts}"],
});
