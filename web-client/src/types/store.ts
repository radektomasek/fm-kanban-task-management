import type { ThemeSlice } from "@/store/theme/theme.slice"
import type { BoardSlice } from "@/store/board/board.slice"
import type { LayoutSlice } from "@/store/layout/layout.slice"

export type Store = ThemeSlice & BoardSlice & LayoutSlice
