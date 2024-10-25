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
	// Read existing columns from file
	jsonData, err := readJSONFile("columns.json")
	if err != nil {
		fmt.Println("error reading file: ", err)
		return err
	}

	var storedData []Column
	if err := json.Unmarshal(jsonData, &storedData); err != nil {
		fmt.Println("error unmarshalling JSON: ", err)
		return err
	}

	// Build a map of existing columns by ID for faster lookups
	existingColumns := make(map[string]Column)
	for _, col := range storedData {
		existingColumns[col.ID] = col
	}

	// Update or add new columns to the map
	for index := range columns {
		if existing, found := existingColumns[columns[index].ID]; found {
			// Merge existing fields
			columns[index].Color = existing.Color
			columns[index].CreatedAt = existing.CreatedAt
		} else {
			// Assign new ID, color, and timestamp for new columns
			columns[index].ID = uuid.NewString()
			columns[index].Color = generateColumnColor()
			columns[index].CreatedAt = time.Now()
		}
		// Update the map with new/updated column
		existingColumns[columns[index].ID] = columns[index]
	}

	// Convert map back to slice for writing
	var updatedColumns []Column
	for _, col := range existingColumns {
		updatedColumns = append(updatedColumns, col)
	}

	// Write the updated columns back to the file
	if err := writeJSONFile("columns.json", updatedColumns); err != nil {
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
