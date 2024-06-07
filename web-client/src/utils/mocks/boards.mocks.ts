import { nanoid } from "nanoid"

export type Board = {
  id: string
  name: string
}

export const boards: Board[] = [
  {
    id: nanoid(),
    name: "Platform Launch",
  },
  {
    id: nanoid(),
    name: "Marketing Plan",
  },
  {
    id: nanoid(),
    name: "Roadmap",
  },
]
