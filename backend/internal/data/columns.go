package data

import (
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"time"
)

type Column struct {
	ID        string    `json:"id"`
	BoardID   string    `json:"boardId"`
	Name      string    `json:"name"`
	Color     string    `json:"color"`
	CreatedAt time.Time `json:"-"`
}

type ColumnModel struct{}

func (c ColumnModel) GetByBoardID(id string) ([]Column, error) {
	jsonData, err := readJSONFile("columns.json")
	if err != nil {
		fmt.Println("error reading file: ", err)
		return nil, err
	}

	var storedData []Column
	err = json.Unmarshal(jsonData, &storedData)

	result := getColumnsByBoardID(id, storedData)

	if result == nil {
		result = []Column{}
	}

	return result, err
}

func (c ColumnModel) Insert(columns []Column) error {
	jsonData, err := readJSONFile("columns.json")
	if err != nil {
		fmt.Println("error reading file: ", err)
		return err
	}

	var storedData []Column
	err = json.Unmarshal(jsonData, &storedData)

	for index := range columns {
		columns[index].ID = uuid.NewString()
		columns[index].Color = generateColumnColor()
		columns[index].CreatedAt = time.Now()
	}

	storedData = append(storedData, columns...)

	err = writeJSONFile("columns.json", storedData)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return err
	}

	return nil
}

func (c ColumnModel) Update(columns []Column) error {
	jsonData, err := readJSONFile("columns.json")
	if err != nil {
		fmt.Println("error reading file: ", err)
		return err
	}

	var storedData []Column
	err = json.Unmarshal(jsonData, &storedData)

	for index, column := range columns {
		element := findColumnElementIfExist(column.ID, storedData)
		if element != nil {
			columns[index].Color = element.Color
			columns[index].CreatedAt = element.CreatedAt
		} else {
			columns[index].ID = uuid.NewString()
			columns[index].Color = generateColumnColor()
			columns[index].CreatedAt = time.Now()
		}
	}

	err = writeJSONFile("columns.json", columns)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return err
	}

	return nil
}

func (c ColumnModel) Delete(id string) error {
	jsonData, err := readJSONFile("columns.json")
	if err != nil {
		fmt.Println("error reading file: ", err)
		return err
	}

	var storedData []Column
	err = json.Unmarshal(jsonData, &storedData)

	result := filterColumnsByBoardID(id, storedData)

	err = writeJSONFile("columns.json", result)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return err
	}

	return nil
}
