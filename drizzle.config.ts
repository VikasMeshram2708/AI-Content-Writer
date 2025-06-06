import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}
export default defineConfig({
  out: "./db/drizzle",
  schema: "./db/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
