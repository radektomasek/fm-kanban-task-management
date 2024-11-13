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
import {
  type Task,
  type TaskForm,
  type TaskDelete,
  type TaskDetail,
  taskSchema,
  taskDeleteSchema,
  isCreateTaskForm,
} from "@/types/tasks"
import { mapBoardData, mapTaskData } from "@/utils/helpers/mapData.helpers"

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
    throw new ReferenceError(
      "(getColumnsByBoardId): boardId parameter is not provided"
    )
  }

  const response = await axiosInstance.get<{ columns: BoardColumn[] }>(
    `/boards/${boardId}/columns`
  )
  const result = boardColumnSchema.array().safeParse(response.data.columns)

  if (!result.success) {
    throw new Error(`[getColumnsByBoardId]: failed to parse the response`)
  }

  return result.data
}

export const createBoard = async (data: BoardForm): Promise<Board> => {
  if (!isCreateBoardForm(data)) {
    throw new Error("[createBoard]: unsupported variant for creating a board")
  }

  const response = await axiosInstance.post<{ board: Board }>(
    "/boards",
    mapBoardData(data)
  )
  const result = boardSchema.safeParse(response.data.board)
  if (!result.success) {
    throw new Error("[createBoard]: failed to parse the response")
  }

  return result.data
}

export const updateBoardById = async (data: BoardForm): Promise<Board> => {
  if (isCreateBoardForm(data)) {
    throw new Error(
      "[updateBoardById]: unsupported variant for updating the board"
    )
  }

  const response = await axiosInstance.put<{ board: Board }>(
    `/boards/${data.id}`,
    mapBoardData(data)
  )

  const result = boardSchema.safeParse(response.data.board)
  if (!result.success) {
    throw new Error("[updateBoardById]: failed to parse the response")
  }

  return result.data
}

export const deleteBoardById = async (id: string): Promise<BoardDelete> => {
  const response = await axiosInstance.delete<BoardDelete>(`/boards/${id}`)

  const result = boardDeleteSchema.safeParse(response.data)
  if (!result.success) {
    throw new Error("[deleteBoardById]: failed to parse the response")
  }

  return result.data
}

export const getTasksByBoardId = async (boardId?: string): Promise<Task[]> => {
  if (!boardId) {
    throw new ReferenceError(
      "(getTasksByBoardId): boardId parameter is not provided"
    )
  }

  const response = await axiosInstance.get<{ tasks: Task[] }>(
    `/boards/${boardId}/tasks`
  )

  const result = taskSchema.array().safeParse(response.data.tasks)

  if (!result.success) {
    throw new Error(
      `[getTasksByBoardId]: failed to parse the response as Task[]`
    )
  }

  return result.data
}

export const getTaskDetailById = async (
  boardId?: string,
  taskId?: string
): Promise<Task> => {
  if (!boardId) {
    throw new ReferenceError(
      "(getTaskDetailById): boardId parameter is not provided"
    )
  }

  if (!taskId) {
    throw new ReferenceError(
      "(getTaskDetailById): taskId parameter is not provided"
    )
  }

  const response = await axiosInstance.get<{ task: Task }>(
    `/boards/${boardId}/tasks/${taskId}`
  )

  const result = taskSchema.safeParse(response.data.task)
  if (!result.success) {
    throw new Error(`[getTaskDetailById]: failed to parse the response`)
  }

  return result.data
}

export const updateTaskDetailById = async (data: TaskDetail): Promise<Task> => {
  const response = await axiosInstance.put<{ task: Task }>(
    `/boards/${data.boardId}/tasks/${data.id}`,
    data
  )

  const result = taskSchema.safeParse(response.data.task)
  if (!result.success) {
    throw new Error(`[updateTaskDetailById]: failed to parse the response`)
  }

  return result.data
}

export const createTask = async (
  data: TaskForm,
  boardId?: string
): Promise<Task> => {
  if (!boardId) {
    throw new ReferenceError("(createTask): boardId parameter is not provided")
  }

  if (!isCreateTaskForm(data)) {
    throw new Error("[createTask]: unsupported variant for creating a task")
  }

  const response = await axiosInstance.post<{ task: Task }>(
    `/boards/${boardId}/tasks`,
    mapTaskData(data)
  )

  const result = taskSchema.safeParse(response.data.task)
  if (!result.success) {
    throw new Error("[createTask]: failed to parse the response")
  }

  return result.data
}

export const updateTaskById = async (
  data: TaskForm,
  boardId?: string
): Promise<Task> => {
  if (!boardId) {
    throw new ReferenceError(
      "(updateTaskById): boardId parameter is not provided"
    )
  }

  if (isCreateTaskForm(data)) {
    throw new Error("[updateTaskById]: unsupported variant for updating a task")
  }

  const response = await axiosInstance.put<{ task: Task }>(
    `/boards/${boardId}/tasks/${data.id}`,
    mapTaskData(data)
  )

  const result = taskSchema.safeParse(response.data.task)
  if (!result.success) {
    throw new Error("[updateTaskById]: failed to parse the response")
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
    throw new ReferenceError(
      "[deleteTaskById]: boardId parameter is not provided"
    )
  }

  if (!taskId) {
    throw new ReferenceError(
      "[deleteTaskById]: taskId parameter is not provided"
    )
  }

  const response = await axiosInstance.delete<TaskDelete>(
    `/boards/${boardId}/tasks/${taskId}`
  )

  const result = taskDeleteSchema.safeParse(response.data)
  if (!result.success) {
    throw new Error(`[deleteTaskById]: Failed to parse the response`)
  }

  return result.data
}
