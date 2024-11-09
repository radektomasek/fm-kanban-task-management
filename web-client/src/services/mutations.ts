import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createBoard,
  updateBoard,
  deleteBoardById,
  updateTaskDetailById,
  deleteTaskById,
} from "@/services/api"

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBoard,
    onSuccess: async ({ id: boardId }) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      await queryClient.invalidateQueries({
        queryKey: ["boards/columns", { boardId }],
      })
    },
  })
}

export function useEditBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: async ({ id: boardId }, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })

      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["boards"],
        })

        await queryClient.invalidateQueries({
          queryKey: ["boards/columns", { boardId }],
        })
      }
    },
  })
}

export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBoardById,
    onSuccess: async ({ id: boardId }) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      queryClient.removeQueries({
        queryKey: ["boards/columns", { boardId }],
      })
    },
  })
}

export function useUpdateTaskDetail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTaskDetailById,
    onSuccess: async ({ id: taskId, boardId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["boards/tasks", { boardId }],
      })

      await queryClient.invalidateQueries({
        queryKey: ["boards/task", { boardId, taskId }],
      })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTaskById,
    onSuccess: async (_, variables) => {
      const { boardId, taskId } = variables

      await queryClient.invalidateQueries({
        queryKey: ["boards/tasks", { boardId }],
      })
      queryClient.removeQueries({
        queryKey: ["boards/task", { boardId, taskId }],
      })
    },
  })
}
