import axios from "axios"
import { boardColumnSchema, type BoardColumn } from "@/types/columns"
import {
  type Board,
  type BoardForm,
  type BoardDelete,
  boardSchema,
  boardDeleteSchema,
  isCreateBoardForm,
} from "@/types/boards"
import { mapBoardData } from "@/utils/helpers/mapData.helpers"
import {
  Task,
  TaskDelete,
  taskDeleteSchema,
  TaskDetailSchema,
  taskSchema,
} from "@/types/tasks"

const BASE_URL = "http://localhost:4000/v1/"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getBoards = async (): Promise<Board[]> => {
  const response = await axiosInstance.get<{ boards: Board[] }>("/boards")
  const result = boardSchema.array().safeParse(response.data.boards)

  if (!result.success) {
    throw new Error("[GET /boards]: failed to parse the response")
  }

  return result.data
}

export const getColumnsByBoardId = async (
  boardId?: string
): Promise<BoardColumn[]> => {
  if (!boardId) {
    throw new ReferenceError("(boardId): the parameter is not provided")
  }

  const response = await axiosInstance.get<{ columns: BoardColumn[] }>(
    `/boards/${boardId}/columns`
  )
  const result = boardColumnSchema.array().safeParse(response.data.columns)

  if (!result.success) {
    throw new Error(
      `[GET /boards/${boardId}/columns]: failed to parse the response`
    )
  }

  return result.data
}

export const createBoard = async (data: BoardForm): Promise<Board> => {
  if (!isCreateBoardForm(data)) {
    throw new Error("[POST /boards]: unsupported variant for creating a board")
  }

  const response = await axiosInstance.post<{ board: Board }>(
    "/boards",
    mapBoardData(data)
  )
  const result = boardSchema.safeParse(response.data.board)
  if (!result.success) {
    throw new Error("[POST /boards]: failed to parse the response")
  }

  return result.data
}

export const updateBoard = async (data: BoardForm): Promise<Board> => {
  if (isCreateBoardForm(data)) {
    throw new Error("[PUT /boards]: unsupported variant for updating the board")
  }

  const response = await axiosInstance.put<{ board: Board }>(
    `/boards/${data.id}`,
    mapBoardData(data)
  )

  const result = boardSchema.safeParse(response.data.board)
  if (!result.success) {
    throw new Error("[PUT /boards]: failed to parse the response")
  }

  return result.data
}

export const deleteBoardById = async (id: string): Promise<BoardDelete> => {
  const response = await axiosInstance.delete<BoardDelete>(`/boards/${id}`)

  const result = boardDeleteSchema.safeParse(response.data)
  if (!result.success) {
    throw new Error("[DELETE /boards]: failed to parse the response")
  }

  return result.data
}

export const getTasksByBoardId = async (boardId?: string): Promise<Task[]> => {
  if (!boardId) {
    throw new ReferenceError("(boardId): the parameter is not provided")
  }

  const response = await axiosInstance.get<{ tasks: Task[] }>(
    `/boards/${boardId}/tasks`
  )

  const result = taskSchema.array().safeParse(response.data.tasks)

  if (!result.success) {
    throw new Error(
      `[GET /boards/${boardId}/tasks]: failed to parse the response as Task[]`
    )
  }

  return result.data
}

export const getTaskDetailById = async (
  boardId?: string,
  taskId?: string
): Promise<Task> => {
  if (!boardId) {
    throw new ReferenceError("(boardId): the parameter is not provided")
  }

  if (!taskId) {
    throw new ReferenceError("(taskId): the parameter is not provided")
  }

  const response = await axiosInstance.get<{ task: Task }>(
    `/boards/${boardId}/tasks/${taskId}`
  )

  const result = taskSchema.safeParse(response.data.task)
  if (!result.success) {
    throw new Error(
      `[GET /boards/${boardId}/tasks/${taskId}]: failed to parse the response`
    )
  }

  return result.data
}

export const updateTaskDetailById = async (
  data: TaskDetailSchema
): Promise<Task> => {
  const response = await axiosInstance.put<{ task: Task }>(
    `/boards/${data.boardId}/tasks/${data.id}`,
    data
  )

  const result = taskSchema.safeParse(response.data.task)
  if (!result.success) {
    throw new Error(
      `[PUT /boards/${data.boardId}/tasks/${data.id}]: failed to parse the response`
    )
  }

  return result.data
}

export const deleteTaskById = async ({
  boardId,
  taskId,
}: {
  boardId?: string
  taskId?: string
}): Promise<TaskDelete> => {
  if (!boardId) {
    throw new ReferenceError("(boardId): the parameter is not provided")
  }

  if (!taskId) {
    throw new ReferenceError("(taskId): the parameter is not provided")
  }

  const response = await axiosInstance.delete<TaskDelete>(
    `/boards/${boardId}/tasks/${taskId}`
  )

  const result = taskDeleteSchema.safeParse(response.data)
  if (!result.success) {
    throw new Error(
      `(DELETE /boards/${boardId}/tasks/${taskId}): Failed to parse the response`
    )
  }

  return result.data
}
