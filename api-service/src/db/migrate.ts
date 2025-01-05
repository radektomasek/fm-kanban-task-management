import { config } from "../config"
import { migrate } from "drizzle-orm/postgres-js/migrator"

async function run() {
  const { setupDB } = await import("./");
  const { db, client } = await setupDB(config.DATABASE_URL)
  await migrate(db, { migrationsFolder: "./migrations" })
  await client.end()
}