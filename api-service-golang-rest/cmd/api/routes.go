package main

import (
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthCheckHandler)
	router.HandlerFunc(http.MethodGet, "/v1/boards", app.getAllBoards)
	router.HandlerFunc(http.MethodPost, "/v1/boards", app.createBoard)
	router.HandlerFunc(http.MethodGet, "/v1/boards/:boardId", app.getBoardByID)
	router.HandlerFunc(http.MethodPut, "/v1/boards/:boardId", app.updateBoardByID)
	router.HandlerFunc(http.MethodDelete, "/v1/boards/:boardId", app.deleteBoardByID)
	router.HandlerFunc(http.MethodGet, "/v1/boards/:boardId/columns", app.getColumnsByBoardID)
	router.HandlerFunc(http.MethodGet, "/v1/boards/:boardId/tasks", app.getTasksByBoardID)
	router.HandlerFunc(http.MethodGet, "/v1/boards/:boardId/tasks/:taskId", app.getTaskByID)
	router.HandlerFunc(http.MethodPost, "/v1/boards/:boardId/tasks", app.createTask)
	router.HandlerFunc(http.MethodPut, "/v1/boards/:boardId/tasks/:taskId", app.updateTaskByID)
	router.HandlerFunc(http.MethodDelete, "/v1/boards/:boardId/tasks/:taskId", app.deleteTaskByID)

	return app.recoverPanic(cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}).Handler(router))
}
