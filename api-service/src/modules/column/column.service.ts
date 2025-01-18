import { z } from "zod"
import { eq } from "drizzle-orm"
import { columns } from "../../db/schema"
import { logger } from "../../utils/logger"
import { createColumnSchema, updateColumnSchema } from "./column.schema"
import { DB } from "../../db"
import { generateStatusColor } from "./column.utils"

export async function createColumns(
  input: z.infer<typeof createColumnSchema>,
  db: DB
) {
  const result = await db
    .insert(columns)
    .values(
      input.map((element) => ({
        ...element,
        color: generateStatusColor(),
      }))
    )
    .returning()

  return result
}

export async function updateColumns(
  input: z.infer<typeof updateColumnSchema>,
  db: DB
) {}

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
