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

export type TaskCreate = {
  variant: "create"
  title: string
  description: string
  columnId: string
  subtasks: {
    title: string
  }[]
}

export type TaskEdit = {
  variant: "edit"
  id: string
  title: string
  description: string
  columnId: string
  subtasks: {
    id: string
    title: string
  }[]
}
