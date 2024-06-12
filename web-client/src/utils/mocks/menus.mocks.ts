import { nanoid } from "nanoid"

type ItemType = "standard" | "destructive"

export type BoardContextMenu = {
  id: string
  title: string
  type: ItemType
  onClickHandler?: (type: ItemType) => void
}

export const boardContextMenuItems: BoardContextMenu[] = [
  {
    id: nanoid(),
    title: "Edit Board",
    type: "standard",
  },
  {
    id: nanoid(),
    title: "Delete Board",
    type: "destructive",
  },
]
