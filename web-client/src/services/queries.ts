import { useQuery } from "@tanstack/react-query"
import { getBoards } from "@/services/api"

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  })
}
