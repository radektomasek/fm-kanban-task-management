import { StateCreator } from "zustand"
import type { ModalScreenKey } from "@/types/modals"

type ModalState = {
  activeModal: ModalScreenKey
  activeSidebarMobile: boolean
}

type ModalActions = {
  handleOpenModal: (modalScreen: ModalScreenKey) => void
  handleCloseModal: () => void
  handleOpenMobileSidebar: () => void
  handleCloseMobileSidebar: () => void
}

export type ModalSlice = ModalState & ModalActions

export const createModalSlice: StateCreator<
  ModalSlice,
  [["zustand/immer", never]],
  [],
  ModalSlice
> = (set) => ({
  activeModal: "None",
  activeSidebarMobile: false,
  handleOpenModal: (modalScreen: ModalScreenKey) =>
    set((state) => {
      state.activeModal = modalScreen
      state.activeSidebarMobile = false
    }),
  handleCloseModal: () =>
    set((state) => {
      state.activeModal = "None"
    }),
  handleOpenMobileSidebar: () =>
    set((state) => {
      state.activeSidebarMobile = true
    }),
  handleCloseMobileSidebar: () =>
    set((state) => {
      state.activeSidebarMobile = false
    }),
})
