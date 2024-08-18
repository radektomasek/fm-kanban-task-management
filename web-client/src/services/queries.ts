import { useQueries, useQuery } from "@tanstack/react-query"
import { getBoards, getColumnsByBoardId } from "@/services/api"
import { Board } from "@/types/boards"

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  })
}

export function useBoardColumn(id?: string) {
  return useQuery({
    queryKey: ["boards/columns", { boardId: id }],
    queryFn: () => getColumnsByBoardId(id),
    enabled: !!id,
  })
}

export function useBoardColumns(data?: Board[]) {
  return useQueries({
    queries: (data ?? []).map((element) => ({
      queryKey: ["boards/columns", { boardId: element.id }],
      queryFn: () => getColumnsByBoardId(element.id),
    })),
  })
}
