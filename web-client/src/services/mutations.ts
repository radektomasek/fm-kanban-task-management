import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBoard } from "@/services/api"

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}
