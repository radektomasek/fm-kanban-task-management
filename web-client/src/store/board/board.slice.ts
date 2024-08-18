import { StateCreator } from "zustand"
import { Board } from "@/types/boards"

type BoardState = {
  selectedBoard?: Board
}

type BoardActions = {
  setSelectedBoard: (selectedBoard?: Board) => void
  clearSelectedBoard: () => void
}

export type BoardSlice = BoardState & BoardActions

export const createBoardSlice: StateCreator<
  BoardSlice,
  [["zustand/immer", never]],
  [],
  BoardSlice
> = (set) => ({
  setSelectedBoard: (selectedBoard?: Board) =>
    set((state) => {
      state.selectedBoard = selectedBoard
    }),
  clearSelectedBoard: () =>
    set((state) => {
      state.selectedBoard = undefined
    }),
})
