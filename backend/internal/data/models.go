package data

import "errors"

var (
	ErrRecordNotFound = errors.New("record not found")
)

type Models struct {
	Boards BoardModel
}

func NewModels() Models {
	return Models{
		Boards: BoardModel{},
	}
}
