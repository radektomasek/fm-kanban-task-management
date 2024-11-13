import { BoardCreate, BoardEdit, TaskCreate, TaskEdit } from "@/types/api"
import { type BoardForm, isEditBoardForm } from "@/types/boards"
import { type TaskForm, isEditTaskForm } from "@/types/tasks"

export const mapBoardData = (
  data: BoardForm
): Omit<BoardCreate, "variant"> | Omit<BoardEdit, "variant"> => {
  if (isEditBoardForm(data)) {
    return {
      id: data.id,
      name: data.name,
      columns: data.columns.map((data) => {
        return { id: data.id, name: data.name }
      }),
    }
  } else {
    return {
      name: data.name,
      columns: data.columns.map((data) => {
        return { name: data.name }
      }),
    }
  }
}

export const mapTaskData = (
  data: TaskForm
): Omit<TaskCreate, "variant"> | Omit<TaskEdit, "variant"> => {
  if (isEditTaskForm(data)) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      columnId: data.columnId,
      subtasks: data.subtasks.map((data) => {
        return { id: data.id, title: data.title }
      }),
    }
  } else {
    return {
      title: data.title,
      description: data.description,
      columnId: data.columnId,
      subtasks: data.subtasks.map((data) => {
        return { title: data.title }
      }),
    }
  }
}
