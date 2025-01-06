import { config } from "../config"
import { migrate } from "drizzle-orm/postgres-js/migrator"

async function run() {
  try {
    const { setupDB } = await import("./");
    const { db, client } = await setupDB(config.DATABASE_URL)
    await migrate(db, { migrationsFolder: "./src/db/migrations" })
    await client.end()
  } catch (error) {
    console.log(error)
  }
}

run()