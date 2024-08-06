package main

import (
	"github.com/julienschmidt/httprouter"
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

	return app.recoverPanic(router)
}
