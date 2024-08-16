import type { BoardCreate, BoardEdit } from "@/types/api"
import type { BoardForm } from "@/types/boards"

export const mapBoardData = (data: BoardForm): BoardCreate | BoardEdit => {
  switch (data.variant) {
    case "create":
      return {
        variant: "create",
        name: data.name,
        columns: data.columns.map((data) => {
          return { name: data.name }
        }),
      }
    case "edit":
      return {
        variant: "edit",
        id: data.id,
        name: data.name,
        columns: data.columns.map((data) => {
          return { id: data.id, name: data.name }
        }),
      }
  }
}
