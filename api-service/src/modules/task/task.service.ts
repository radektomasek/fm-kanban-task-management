import { InferInsertModel } from "drizzle-orm"
import { DB } from "../../db"
import { tasks } from "../../db/schema"
import { logger } from "../../utils/logger"

export async function createTask(
  input: InferInsertModel<typeof tasks>,
  db: DB
) {
  try {
    const result = await db.insert(tasks).values(input).returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "createTask: failed to insert data")
    throw error
  }
}
