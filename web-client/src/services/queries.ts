import { useQueries, useQuery } from "@tanstack/react-query"
import {
  getBoards,
  getColumnsByBoardId,
  getTaskDetailById,
  getTasksByBoardId,
} from "@/services/api"
import { Board } from "@/types/boards"

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  })
}

export function useBoardColumns(boardId?: string) {
  return useQuery({
    queryKey: ["boards/columns", { boardId: boardId }],
    queryFn: () => getColumnsByBoardId(boardId),
    enabled: !!boardId,
  })
}

export function useBoardColumnsParallel(data?: Board[]) {
  return useQueries({
    queries: (data ?? []).map((element) => ({
      queryKey: ["boards/columns", { boardId: element.id }],
      queryFn: () => getColumnsByBoardId(element.id),
    })),
  })
}

export function useBoardTasks(boardId?: string) {
  return useQuery({
    queryKey: ["boards/tasks", { boardId: boardId }],
    queryFn: () => getTasksByBoardId(boardId),
    enabled: !!boardId,
  })
}

export function useBoardTaskDetail(boardId?: string, taskId?: string) {
  return useQuery({
    queryKey: ["boards/task", { boardId: boardId, taskId: taskId }],
    queryFn: () => getTaskDetailById(boardId, taskId),
    enabled: !!boardId && !!taskId,
  })
}
