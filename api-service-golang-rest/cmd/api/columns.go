package main

import (
	"fmt"
	"net/http"
)

func (app *application) getColumnsByBoardID(w http.ResponseWriter, r *http.Request) {
	boardId, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	columns, err := app.models.Columns.GetByBoardID(boardId)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s/columns", boardId))

	err = app.writeJSON(w, http.StatusOK, envelope{"columns": columns}, headers)
}
