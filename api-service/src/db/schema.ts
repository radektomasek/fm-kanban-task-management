import {
  pgTable,
  uuid,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core"

const timestamps = {
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 25 }).unique().notNull(),

  ...timestamps,
})

export const boards = pgTable("boards", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 25 }).notNull(),
  projectId: uuid("projectId")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
})

export const columns = pgTable("columns", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 15 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  boardId: uuid("boardId")
    .references(() => boards.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
})

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 50 }).notNull(),
  description: text("description"),
  position: integer("position").unique().notNull(),
  boardId: uuid("boardId")
    .references(() => boards.id, { onDelete: "cascade" })
    .notNull(),
  columnId: uuid("columnId")
    .references(() => columns.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
})

export const subtasks = pgTable("subtasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false),
  taskId: uuid("taskId")
    .references(() => tasks.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
})
