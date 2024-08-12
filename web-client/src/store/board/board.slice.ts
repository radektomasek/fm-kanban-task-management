import { StateCreator } from "zustand"

type BoardState = {
  selectedBoardId?: string
}

type BoardActions = {
  setSelectedBoardId: (boardId?: string) => void
}

export type BoardSlice = BoardState & BoardActions

export const createBoardSlice: StateCreator<
  BoardSlice,
  [["zustand/immer", never]],
  [],
  BoardSlice
> = (set) => ({
  setSelectedBoardId: (boardId?: string) =>
    set((state) => {
      state.selectedBoardId = boardId
    }),
})
