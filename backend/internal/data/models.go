package data

import "errors"

var (
	ErrRecordNotFound = errors.New("record not found")
)

type Models struct {
	Boards  BoardModel
	Columns ColumnModel
}

func NewModels() Models {
	return Models{
		Boards:  BoardModel{},
		Columns: ColumnModel{},
	}
}
