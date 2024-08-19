import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBoard, updateBoard, deleteBoard } from "@/services/api"

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBoard,
    onSuccess: async ({ id: boardId }) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      await queryClient.invalidateQueries({
        queryKey: ["boards/columns", { boardId: boardId }],
      })
    },
  })
}

export function useEditBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: async ({ id }, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })

      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["boards"],
        })

        await queryClient.invalidateQueries({
          queryKey: ["boards/columns", { boardId: id }],
        })
      }
    },
  })
}

export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
      queryClient.removeQueries({
        queryKey: ["boards/columns", { boardId: id }],
      })
    },
  })
}
