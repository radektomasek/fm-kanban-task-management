export type ThemeMode = "light" | "dark"

export const toggleTheme = (theme: ThemeMode): ThemeMode => {
  return theme === "light" ? "dark" : "light"
}
