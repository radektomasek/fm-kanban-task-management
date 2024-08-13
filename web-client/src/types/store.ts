import type { ThemeSlice } from "@/store/theme/theme.slice"
import type { BoardSlice } from "@/store/board/board.slice"
import type { ModalSlice } from "@/store/modal/modal.slice"

export type Store = ThemeSlice & BoardSlice & ModalSlice
