import { useEffect } from "react"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export const ThemeProvider = () => {
  const { selectedTheme } = useStore(
    useShallow((state) => ({
      selectedTheme: state.selectedTheme,
    }))
  )

  useEffect(() => {
    const htmlElement = document.documentElement

    if (selectedTheme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
  }, [selectedTheme])

  return null
}
