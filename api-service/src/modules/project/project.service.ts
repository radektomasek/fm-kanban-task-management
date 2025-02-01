import { InferInsertModel, eq } from "drizzle-orm"
import { projects } from "../../db/schema"
import { DB } from "../../db"
import { logger } from "../../utils/logger"

export async function createProject(
  input: InferInsertModel<typeof projects>,
  db: DB
) {
  try {
    const result = await db.insert(projects).values(input).returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "createProject: failed to insert data")
    throw error
  }
}

export async function updateProjectById(
  projectId: string,
  props: Partial<Pick<InferInsertModel<typeof projects>, "name">>,
  db: DB
) {
  try {
    const result = await db
      .update(projects)
      .set(props)
      .where(eq(projects.id, projectId))
      .returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error(
      { projectId, message },
      "updateProjectById: failed to update data"
    )
  }
}

export async function getProjectById(projectId: string, db: DB) {
  try {
    const result = await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    })

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ projectId, message }, "getProjectById: failed to get data")
  }
}
