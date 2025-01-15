import { DB } from "../../db"
import { eq } from "drizzle-orm"
import { columns } from "../../db/schema"
import { logger } from "../../utils/logger"

export async function createColumns() {}

export async function updateColumns() {}

export async function getColumnsByBoardId(boardId: string, db: DB) {
  try {
    const result = await db.query.columns.findMany({
      where: eq(columns.boardId, boardId),
    })

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error(
      { boardId, message },
      "getColumnsByBoardId: failed to get data"
    )
  }
}
