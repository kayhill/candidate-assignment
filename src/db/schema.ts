import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  varchar,
  index,
  smallint,
  check
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").default([]).notNull(),
  yearsOfExperience: smallint("years_of_experience").notNull(),
  phoneNumber: varchar("phone_number", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at")
},
  (table) => [
    index("first_name_idx").on(table.firstName),
    index("last_name_idx").on(table.lastName),
    index("specialties_idx").using('gin', sql`${table.specialties}`),
    index("years_of_experience_idx").on(table.yearsOfExperience),
    index("city_idx").on(table.city),
    index("degree_idx").on(table.degree),

    check("years_of_experience_check", sql`${table.yearsOfExperience} > 0`)
]);

export { advocates };
