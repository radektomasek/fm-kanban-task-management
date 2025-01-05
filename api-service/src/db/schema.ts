import { randomUUID } from "node:crypto"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

const timestamps = {
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
}

export const projects = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .$default(() => {
      return randomUUID()
    }),
  name: text("name").unique().notNull()
})