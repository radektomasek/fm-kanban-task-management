import { StateCreator } from "zustand"
import type { ModalScreenKey } from "@/types/modals"

type ModalState = {
  activeModal: ModalScreenKey
}

type ModalActions = {
  handleOpenModal: (modalScreen: ModalScreenKey) => void
  handleCloseModal: () => void
}

export type ModalSlice = ModalState & ModalActions

export const createModalSlice: StateCreator<
  ModalSlice,
  [["zustand/immer", never]],
  [],
  ModalSlice
> = (set) => ({
  activeModal: "None",
  handleOpenModal: (modalScreen: ModalScreenKey) =>
    set((state) => {
      state.activeModal = modalScreen
    }),
  handleCloseModal: () =>
    set((state) => {
      state.activeModal = "None"
    }),
})
