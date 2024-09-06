package data

import "time"

type Task struct {
	ID        string    `json:"id"`
	BoardID   string    `json:"boardId"`
	ColumnID  string    `json:"columnId"`
	Title     string    `json:"title"`
	Subtasks  Subtasks  `json:"subtasks"`
	CreatedAt time.Time `json:"-"`
}

type TaskModel struct{}

func (t TaskModel) Insert(task *Task) error {
	return nil
}

func (t TaskModel) GetAll(task *Task) ([]Task, error) {
	return nil, nil
}

func (t TaskModel) GetByID(id string) (*Task, error) {
	return nil, nil
}

func (t TaskModel) Update(payload *Task) (*Task, error) {
	return nil, nil
}

func (t TaskModel) Delete(task *Task) error {
	return nil
}
