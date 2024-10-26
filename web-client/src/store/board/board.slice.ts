import { StateCreator } from "zustand"
import type { Board } from "@/types/boards"
import type { Task } from "@/types/tasks"

type BoardState = {
  selectedBoard?: Board
  selectedTask?: Task
  selectedTaskId?: string
}

type BoardActions = {
  setSelectedBoard: (selectedBoard?: Board) => void
  setSelectedTask: (selectedTask?: Task) => void
  clearSelectedBoard: () => void
  clearSelectedTask: () => void
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
  setSelectedTask: (selectedTask?: Task) =>
    set((state) => {
      state.selectedTask = selectedTask
    }),
  clearSelectedBoard: () =>
    set((state) => {
      state.selectedBoard = undefined
    }),
  clearSelectedTask: () =>
    set((state) => {
      state.selectedTask = undefined
    }),
})
