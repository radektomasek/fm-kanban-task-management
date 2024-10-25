import { StateCreator } from "zustand"
import { Board } from "@/types/boards"

type BoardState = {
  selectedBoard?: Board
  selectedTaskId?: string
}

type BoardActions = {
  setSelectedBoard: (selectedBoard?: Board) => void
  setSelectedTaskId: (taskId?: string) => void
  clearSelectedBoard: () => void
  clearSelectedTaskId: () => void
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
  setSelectedTaskId: (taskId?: string) =>
    set((state) => {
      state.selectedTaskId = taskId
    }),
  clearSelectedBoard: () =>
    set((state) => {
      state.selectedBoard = undefined
    }),
  clearSelectedTaskId: () =>
    set((state) => {
      state.selectedTaskId = undefined
    }),
})
