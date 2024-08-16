export type BoardCreate = {
  variant: "create"
  name: string
  columns: {
    name: string
  }[]
}

export type BoardEdit = {
  variant: "edit"
  id: string
  name: string
  columns: {
    id: string
    name: string
  }[]
}
