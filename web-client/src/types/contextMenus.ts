import type { ModalScreenKey } from "@/types/modals"

type ItemType = "standard" | "destructive"

export type BoardContextMenu = {
  id: ModalScreenKey
  title: string
  type: ItemType
}
