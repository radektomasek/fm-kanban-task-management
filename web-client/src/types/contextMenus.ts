import type { ModalScreenKey } from "@/types/modals"

type ItemType = "standard" | "destructive"

export type BoardContextMenu = {
  id: ModalScreenKey
  title: string
  type: ItemType
}

export const boardContextMenuItems: BoardContextMenu[] = [
  {
    id: "EditBoardScreen",
    title: "Edit Board",
    type: "standard",
  },
  {
    id: "DeleteBoardScreen",
    title: "Delete Board",
    type: "destructive",
  },
]
