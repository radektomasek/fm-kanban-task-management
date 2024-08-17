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
	router.HandlerFunc(http.MethodGet, "/v1/boards/:boardId", app.getBoardById)
	router.HandlerFunc(http.MethodPut, "/v1/boards/:boardId", app.updateBoard)
	router.HandlerFunc(http.MethodDelete, "/v1/boards/:boardId", app.deleteBoard)
	router.HandlerFunc(http.MethodGet, "/v1/boards/:boardId/columns", app.getColumnsByBoardID)

	return app.recoverPanic(cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}).Handler(router))
}
