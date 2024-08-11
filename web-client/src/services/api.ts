import axios from "axios"
import { boardSchema, type Board } from "@/types/boards"

const BASE_URL = "http://localhost:4000/v1/"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getBoards = async (): Promise<Board[]> => {
  const response = await axiosInstance.get<{ boards: Board[] }>("/boards")
  const result = boardSchema.array().safeParse(response.data.boards)

  if (!result.success) {
    throw new Error("getBoards(): failed to parse /boards response")
  }

  return result.data
}
