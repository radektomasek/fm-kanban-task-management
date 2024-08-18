package data

import (
	"fmt"
	"math"
	"math/rand"
)

func generateColumnColor() string {
	randomInt := func(min, max int) int {
		return int(math.Floor(float64(rand.Intn(max-min+1) + min)))
	}

	h := randomInt(0, 360)
	s := randomInt(42, 98)
	l := randomInt(40, 90)

	return fmt.Sprintf("hsl(%d,%d%%,%d%%)", h, s, l)
}

func findColumnElementIfExist(id string, data []Column) *Column {
	var result *Column

	for _, column := range data {
		if column.ID == id {
			result = &column
		}
	}

	return result
}

func getColumnsByBoardID(id string, data []Column) []Column {
	var result []Column

	for _, column := range data {
		if column.BoardID == id {
			result = append(result, column)
		}
	}

	return result
}

func filterColumnsByBoardID(id string, data []Column) []Column {
	var result []Column

	for _, column := range data {
		if column.BoardID != id {
			result = append(result, column)
		}
	}

	return result
}

func filterBoardByID(id string, data []Board) []Board {
	var result []Board

	for _, board := range data {
		if board.ID != id {
			result = append(result, board)
		}
	}

	return result
}
