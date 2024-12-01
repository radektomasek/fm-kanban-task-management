package main

import (
	"fmt"
	"github.com/radektomasek/fm-kanban-task-management/internal/data"
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
	boardId, err := app.readUrlParamField(r, "boardId")
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	var input struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Subtasks    []struct {
			ID    string `json:"id"`
			Title string `json:"title"`
		} `json:"subtasks"`
		ColumnID string `json:"columnId"`
	}

	err = app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	task := &data.Task{
		Title:       input.Title,
		Description: input.Description,
		BoardID:     boardId,
		ColumnID:    input.ColumnID,
	}

	var subtasks []data.Subtask
	for _, subtask := range input.Subtasks {
		subtasks = append(subtasks, data.Subtask{Title: subtask.Title})
	}

	result, err := app.models.Tasks.Insert(task, subtasks)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s/tasks", boardId))

	err = app.writeJSON(w, http.StatusCreated, envelope{"task": result}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) updateTaskByID(w http.ResponseWriter, r *http.Request) {
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

	if task == nil {
		app.notFoundResponse(w, r)
		return
	}

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	var input struct {
		ID          string `json:"id"`
		ColumnID    string `json:"columnId"`
		BoardID     string `json:"boardId"`
		Title       string `json:"title"`
		Description string `json:"description"`
		Subtasks    []struct {
			ID        string `json:"id,omitempty"`
			TaskID    string `json:"taskId,omitempty"`
			Title     string `json:"title"`
			Completed bool   `json:"completed,omitempty"`
		} `json:"subtasks"`
	}

	err = app.readJSON(w, r, &input)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

	updatedTask := &data.Task{
		ID:          taskId,
		BoardID:     boardId,
		ColumnID:    input.ColumnID,
		Title:       input.Title,
		Description: input.Description,
	}

	var updatedSubtasks []data.Subtask
	for _, subtask := range input.Subtasks {
		updatedSubtasks = append(updatedSubtasks, data.Subtask{ID: subtask.ID, TaskID: taskId, Title: subtask.Title, Completed: subtask.Completed})
	}

	result, err := app.models.Tasks.Update(updatedTask, updatedSubtasks)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s/tasks/%s", boardId, taskId))

	err = app.writeJSON(w, http.StatusOK, envelope{"task": result}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) deleteTaskByID(w http.ResponseWriter, r *http.Request) {
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

	if task == nil {
		app.notFoundResponse(w, r)
		return
	}

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.models.Tasks.Delete(taskId)

	headers := make(http.Header)
	headers.Set("Location", fmt.Sprintf("/v1/boards/%s/tasks/%s", boardId, taskId))

	err = app.writeJSON(w, http.StatusOK, envelope{"id": taskId, "message": "task deleted successfully"}, headers)
	if err != nil {

		app.serverErrorResponse(w, r, err)
	}
}
