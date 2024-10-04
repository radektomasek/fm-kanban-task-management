package main

import (
	"fmt"
	"net/http"
)

func (app *application) getTasksByBoardID(w http.ResponseWriter, r *http.Request) {
	boardId, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	tasks, err := app.models.Tasks.GetTasksByBoardID(boardId)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s/tasks", boardId))

	err = app.writeJSON(w, http.StatusOK, envelope{"tasks": tasks}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
}

func (app *application) getTaskByID(w http.ResponseWriter, r *http.Request) {
	boardId, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	taskId, err := app.readUrlParamField(r, "taskId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	task, err := app.models.Tasks.GetTaskByID(boardId, taskId)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s/tasks/%s", boardId, taskId))

	err = app.writeJSON(w, http.StatusOK, envelope{"task": task}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}
}

func (app *application) createTask(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}

func (app *application) updateTaskByID(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}

func (app *application) deleteTaskByID(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}
