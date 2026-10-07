import { DataSource, type DataSourceOptions } from "typeorm";
import "dotenv/config";

export const dbOptions: DataSourceOptions = {
  logging: true,
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
  migrations: ["src/migrations/**/*{.js,.ts}"],
};

export const datasource = new DataSource(dbOptions);
