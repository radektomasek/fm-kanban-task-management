import { createBrowserRouter, Navigate } from "react-router-dom"
import { BoardsPage, BoardPage } from "@/views/Boards"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/boards"} />,
  },
  {
    path: "/boards",
    element: <BoardsPage />,
    children: [
      {
        path: "/boards/:boardId",
        element: <BoardPage />,
      },
    ],
  },
])
