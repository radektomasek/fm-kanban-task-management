package main

import (
	"fmt"
	"net/http"
)

func (app *application) getAllTasks(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}

func (app *application) createTask(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}

func (app *application) getTaskByID(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}

func (app *application) updateTaskByID(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}

func (app *application) deleteTaskByID(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Placeholder response")
}
