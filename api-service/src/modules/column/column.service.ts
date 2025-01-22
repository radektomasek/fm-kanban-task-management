import { z } from "zod"
import { eq, sql } from "drizzle-orm"
import { PgTransaction } from "drizzle-orm/pg-core"
import { columns } from "../../db/schema"
import { logger } from "../../utils/logger"
import { createColumnSchema, updateColumnSchema } from "./column.schema"
import { DB } from "../../db"
import { generateStatusColor } from "./column.utils"

export async function createColumns(
  input: z.infer<typeof createColumnSchema>,
  trx: Parameters<Parameters<DB["transaction"]>[0]>[0]
) {
  try {
    const result = await trx
      .insert(columns)
      .values(
        input.map((element) => ({
          ...element,
          color: generateStatusColor(),
        }))
      )
      .returning()

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "updateColumns: failed to insert data")
  }
}

export async function updateColumns(
  input: z.infer<typeof updateColumnSchema>,
  trx: Parameters<Parameters<DB["transaction"]>[0]>[0]
) {
  try {
    const result = await trx
      .insert(columns)
      .values(
        input.map((element) => ({
          id: element.columnId,
          name: element.name,
          projectId: element.projectId,
          boardId: element.boardId,
          color: generateStatusColor(),
        }))
      )
      .onConflictDoUpdate({
        target: columns.id,
        set: {
          name: sql.raw(`excluded.${columns.name.name}`),
        },
      })
      .returning()
    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "updateColumns: failed to update data")
  }
}

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
