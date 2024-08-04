package data

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"io"
	"os"
	"time"
)

type Column struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"-"`
}

type Board struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Columns   []Column  `json:"columns"`
	CreatedAt time.Time `json:"-"`
}

/**
 * @TODO: Add some validation logic + DB operations
 * At the moment we are working with a FS to quickly prototype the system.
 * There will be a proper DB operation
 */

type BoardModel struct{}

func (b BoardModel) Insert(board *Board) error {
	// we need to read the boards from the disk - not a problem if it doesn't exist
	file, err := os.Open("boards.json")
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		fmt.Println("Error opening file: ", err)
		return err
	}
	defer file.Close()

	jsonData, err := io.ReadAll(file)
	if err != nil {
		fmt.Println("Error reading file: ", err)
	}

	var boards []Board
	err = json.Unmarshal(jsonData, &boards)

	// will be replaced by proper DB operation
	board.ID = uuid.NewString()
	board.CreatedAt = time.Now()

	for index := range board.Columns {
		board.Columns[index].ID = uuid.NewString()
		board.Columns[index].CreatedAt = time.Now()
	}

	boards = append(boards, *board)

	jsonData, err = json.MarshalIndent(boards, "", "  ")
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return err
	}

	// We can write it to filesystem - this will be removed at some point
	file, err = os.Create("boards.json")
	if err != nil {
		fmt.Println("Error creating file: ", err)
		return err
	}
	defer file.Close()

	_, err = file.Write(jsonData)
	if err != nil {
		fmt.Println("Error writing to file: ", err)
		return err
	}

	return nil
}

func (b BoardModel) GetAll() (*Board, error) {
	return nil, nil
}

func (b BoardModel) GetByID(id string) (*Board, error) {
	return nil, nil
}

func (b BoardModel) Update(board *Board) error {
	return nil
}

func (b BoardModel) Delete(board *Board) error {
	return nil
}
