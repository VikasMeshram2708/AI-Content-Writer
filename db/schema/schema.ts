import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

const timeStatmps = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
};

export const userRole = pgEnum("role", ["ADMIN", "USER"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: userRole().default("USER"),
  picture: text("picture"),
  password: text("password").notNull(),
  isOnboarded: boolean("is_onboarded").default(false),
  ...timeStatmps,
});
