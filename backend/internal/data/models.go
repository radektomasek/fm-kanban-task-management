package data

import "errors"

var (
	ErrRecordNotFound = errors.New("record not found")
)

type Models struct {
	Boards   BoardModel
	Columns  ColumnModel
	Tasks    TaskModel
	Subtasks SubtaskModel
}

func NewModels() Models {
	return Models{
		Boards:   BoardModel{},
		Columns:  ColumnModel{},
		Tasks:    TaskModel{},
		Subtasks: SubtaskModel{},
	}
}
