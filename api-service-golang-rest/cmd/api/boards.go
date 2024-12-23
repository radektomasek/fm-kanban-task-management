package main

import (
	"fmt"
	"github.com/radektomasek/fm-kanban-task-management/internal/data"
	"net/http"
)

func (app *application) getAllBoards(w http.ResponseWriter, r *http.Request) {
	boards, err := app.models.Boards.GetAll()
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprint("/v1/boards"))

	err = app.writeJSON(w, http.StatusOK, envelope{"boards": boards}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
}

func (app *application) getBoardByID(w http.ResponseWriter, r *http.Request) {
	id, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	board, err := app.models.Boards.GetByID(id)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s", board.ID))

	err = app.writeJSON(w, http.StatusOK, envelope{"board": board}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
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

	board := &data.Board{
		Name: input.Name,
	}

	err = app.models.Boards.Insert(board)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	var columns []data.Column
	for _, column := range input.Columns {
		columns = append(columns, data.Column{BoardID: board.ID, Name: column.Name})
	}

	err = app.models.Columns.Insert(columns)
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

func (app *application) updateBoardByID(w http.ResponseWriter, r *http.Request) {
	id, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	_, err = app.models.Boards.GetByID(id)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	var input struct {
		ID      string `json:"id"`
		Name    string `json:"name"`
		Columns []struct {
			ID      string `json:"id,omitempty"`
			BoardID string `json:"boardId,omitempty"`
			Name    string `json:"name"`
		} `json:"columns"`
	}

	err = app.readJSON(w, r, &input)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	updatedBoard := &data.Board{
		ID:   input.ID,
		Name: input.Name,
	}

	result, err := app.models.Boards.Update(updatedBoard)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	var columns []data.Column
	for _, column := range input.Columns {
		columns = append(columns, data.Column{ID: column.ID, BoardID: result.ID, Name: column.Name})
	}

	err = app.models.Columns.Update(columns)

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s", result.ID))

	err = app.writeJSON(w, http.StatusOK, envelope{"board": result}, headers)
}

func (app *application) deleteBoardByID(w http.ResponseWriter, r *http.Request) {
	id, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	board, err := app.models.Boards.GetByID(id)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.models.Boards.Delete(board)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.models.Columns.Delete(id)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s", board.ID))

	err = app.writeJSON(w, http.StatusOK, envelope{"id": id, "message": "board deleted successfully"}, headers)
}
