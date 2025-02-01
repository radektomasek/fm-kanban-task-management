import { z } from "zod"
import { createSubtaskSchema, updateSubtasksSchema } from "./subtask.schema"
import { DB } from "../../db"
import { subtasks } from "../../db/schema"
import { logger } from "../../utils/logger"
import { sql } from "drizzle-orm"

export async function createSubtask(
  input: z.infer<typeof createSubtaskSchema>,
  trx: Parameters<Parameters<DB["transaction"]>[0]>[0]
) {
  try {
    const result = await trx.insert(subtasks).values(input).returning()

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "createSubtask: failed to insert data")
  }
}

export async function updateSubtask(
  input: z.infer<typeof updateSubtasksSchema>,
  trx: Parameters<Parameters<DB["transaction"]>[0]>[0]
) {
  try {
    const result = await trx
      .insert(subtasks)
      .values(input)
      .onConflictDoUpdate({
        target: subtasks.id,
        set: {
          title: sql.raw(`excluded.${subtasks.title.name}`),
          completed: sql.raw(`excluded.${subtasks.completed.name}`),
        },
      })
      .returning()

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "updateSubtask: failed to update data")
  }
}
