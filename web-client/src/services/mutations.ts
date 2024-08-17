import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBoard, deleteBoard } from "@/services/api"

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}

export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}
