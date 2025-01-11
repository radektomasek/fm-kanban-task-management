import { InferInsertModel, eq } from "drizzle-orm"
import { boards } from "../../db/schema"
import { DB } from "../../db"
import { logger } from "../../utils/logger"

export async function createBoard(
  input: InferInsertModel<typeof boards>,
  db: DB
) {
  try {
    const result = await db.insert(boards).values(input).returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "createBoard: failed to insert data")
    throw error
  }
}
