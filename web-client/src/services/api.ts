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

export const deleteBoard = async (id: string): Promise<BoardDelete> => {
  const response = await axiosInstance.delete<BoardDelete>(`/boards/${id}`)

  const result = boardDeleteSchema.safeParse(response.data)
  if (!result.success) {
    throw new Error("[DELETE /boards]: failed to parse the response")
  }

  return result.data
}
