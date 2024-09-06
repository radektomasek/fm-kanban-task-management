package data

import "time"

type Subtasks struct {
	Subtasks  []Subtask `json:"subtasks"`
	Total     int       `json:"total"`
	Completed int       `json:"completed"`
}

type Subtask struct {
	ID        string    `json:"id"`
	TaskID    string    `json:"taskId"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"-"`
}

type SubtaskModel struct{}

func (s SubtaskModel) Insert(subtask *Subtask) error {
	return nil
}

func (s SubtaskModel) GetAll() ([]Subtask, error) {
	return nil, nil
}

func (s SubtaskModel) Update(payload *SubtaskModel) (*Subtask, error) {
	return nil, nil
}

func (s SubtaskModel) Delete(subtask *Subtask) error {
	return nil
}
