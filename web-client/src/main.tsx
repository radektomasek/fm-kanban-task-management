import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ModalContainer } from "@/views/Modals"
import { router } from "@/routes"
import "./index.css"

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ModalContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
