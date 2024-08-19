import type { ThemeMode } from "@/types/theme"

export const toggleTheme = (theme: ThemeMode): ThemeMode => {
  return theme === "light" ? "dark" : "light"
}
