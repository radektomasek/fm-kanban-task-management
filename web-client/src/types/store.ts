import type { ThemeSlice } from "@/store/theme/theme.slice"
import type { BoardSlice } from "@/store/board/board.slice"

export type Store = ThemeSlice & BoardSlice
