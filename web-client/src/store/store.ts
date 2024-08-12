import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { createThemeSlice } from "./theme/theme.slice"
import { createBoardSlice } from "@/store/board/board.slice"
import { Store } from "@/types/store"

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createThemeSlice(...a),
        ...createBoardSlice(...a),
      })),
      {
        name: "kanban-app-local-storage",
      }
    )
  )
)
