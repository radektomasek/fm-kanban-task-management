import axios from "axios"
import { boardSchema, type Board, type BoardForm } from "@/types/boards"
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

export const createBoard = async (data: BoardForm): Promise<Board> => {
  const { variant, ...payload } = mapBoardData(data)
  if (variant !== "create") {
    throw new Error("[POST /boards]: unsupported variant for creating board")
  }

  const response = await axiosInstance.post<{ board: Board }>(
    "/boards",
    payload
  )
  const result = boardSchema.safeParse(response.data.board)
  if (!result.success) {
    throw new Error("[POST /boards]: failed to parse the response")
  }

  return result.data
}
