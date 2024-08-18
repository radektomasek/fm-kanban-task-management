import type { BoardCreate, BoardEdit } from "@/types/api"
import { BoardForm, isEditBoardForm } from "@/types/boards"

export const mapBoardData = (
  data: BoardForm
): Omit<BoardCreate, "variant"> | Omit<BoardEdit, "variant"> => {
  if (isEditBoardForm(data)) {
    return {
      id: data.id,
      name: data.name,
      columns: data.columns.map((data) => {
        return { id: data.id, name: data.name }
      }),
    }
  } else {
    return {
      name: data.name,
      columns: data.columns.map((data) => {
        return { name: data.name }
      }),
    }
  }
}
