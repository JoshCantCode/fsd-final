import { betterAuth } from "better-auth";
import "dotenv/config";
import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { datasource } from "src/datasource.config";
import { UserRole } from "src/types/user";

export const auth = betterAuth({
  database: typeormAdapter(datasource),
  secret: process.env.AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "number",
        required: false,
        defaultValue: UserRole.MEMBER,
        input: false,
      },
      locationId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  advanced: { database: { generateId: "uuid" } },
});
