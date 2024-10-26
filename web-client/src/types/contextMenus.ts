import type { ModalScreenKey } from "@/types/modals"

type ItemType = "standard" | "destructive"

export type ContextMenuElement = {
  id: ModalScreenKey
  title: string
  type: ItemType
}

export const boardContextMenuItems: ContextMenuElement[] = [
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

export const taskContextMenuItems: ContextMenuElement[] = [
  {
    id: "EditTaskScreen",
    title: "Edit Task",
    type: "standard",
  },
  {
    id: "DeleteTaskScreen",
    title: "Delete Task",
    type: "destructive",
  },
]
