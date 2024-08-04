package main

import (
	"fmt"
	"github.com/radektomasek/fm-kanban-task-management/internal/data"
	"net/http"
)

func (app *application) getAllBoards(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Endpoint placeholder for getting all of the boards")
}

func (app *application) getBoardById(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Endpoint placeholder for getting board data (by id)")
}

func (app *application) createBoard(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Name    string `json:"name"`
		Columns []struct {
			Name string `json:"name"`
		} `json:"columns"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	var columns []data.Column
	for _, column := range input.Columns {
		columns = append(columns, data.Column{Name: column.Name})
	}

	board := &data.Board{
		Name:    input.Name,
		Columns: columns,
	}

	err = app.models.Boards.Insert(board)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s", board.ID))

	err = app.writeJSON(w, http.StatusCreated, envelope{"board": board}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) updateBoard(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Endpoint placeholder for updating an existing board (by id)")
}

func (app *application) deleteBoard(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Endpoint placeholder for deleting an existing board (by id)")
}
