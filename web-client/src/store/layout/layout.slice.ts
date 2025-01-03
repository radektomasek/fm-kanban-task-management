import { StateCreator } from "zustand"
import type { ModalScreenKey } from "@/types/modals"

type LayoutState = {
  activeModal: ModalScreenKey
  activeSidebarLargeScreen: boolean
  activeSidebarSmallScreen: boolean
}

type LayoutActions = {
  handleOpenModal: (modalScreen: ModalScreenKey) => void
  handleCloseModal: () => void
  toggleLargeSidebarVisibility: () => void
  handleOpenMobileSidebar: () => void
  handleCloseMobileSidebar: () => void
}

export type LayoutSlice = LayoutState & LayoutActions

export const createLayoutSlice: StateCreator<
  LayoutSlice,
  [["zustand/immer", never]],
  [],
  LayoutSlice
> = (set) => ({
  activeModal: "None",
  activeSidebarLargeScreen: true,
  activeSidebarSmallScreen: false,
  handleOpenModal: (modalScreen: ModalScreenKey) =>
    set((state) => {
      state.activeModal = modalScreen
      state.activeSidebarSmallScreen = false
    }),
  handleCloseModal: () =>
    set((state) => {
      state.activeModal = "None"
    }),
  toggleLargeSidebarVisibility: () =>
    set((state) => {
      state.activeSidebarLargeScreen = !state.activeSidebarLargeScreen
    }),
  handleOpenMobileSidebar: () =>
    set((state) => {
      state.activeSidebarSmallScreen = true
    }),
  handleCloseMobileSidebar: () =>
    set((state) => {
      state.activeSidebarSmallScreen = false
    }),
})
