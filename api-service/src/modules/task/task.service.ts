import { eq, InferInsertModel } from "drizzle-orm"
import { DB } from "../../db"
import { boards, tasks } from "../../db/schema"
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

export async function updateTaskById(
  taskId: string,
  props: Partial<
    Pick<
      InferInsertModel<typeof tasks>,
      "boardId" | "title" | "columnId" | "description" | "position"
    >
  >,
  db: DB
) {
  try {
    const result = await db
      .update(tasks)
      .set(props)
      .where(eq(tasks.id, taskId))
      .returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ taskId, message }, "updateTaskById: failed to update data")
  }
}
