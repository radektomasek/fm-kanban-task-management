import { StateCreator } from "zustand"
import type { ThemeMode } from "@/types/theme"

type ThemeState = {
  selectedTheme: ThemeMode
}

type ThemeActions = {
  setTheme: (theme: ThemeMode) => void
}

export type ThemeSlice = ThemeState & ThemeActions

export const createThemeSlice: StateCreator<
  ThemeSlice,
  [["zustand/immer", never]],
  [],
  ThemeSlice
> = (set) => ({
  selectedTheme: "light",
  setTheme: (theme: ThemeMode) =>
    set((state) => {
      state.selectedTheme = theme
    }),
})
