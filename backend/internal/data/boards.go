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
	jsonData, err := readJSONFile("boards.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return err
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

	err = writeJSONFile("boards.json", boards)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return err
	}

	return nil
}

func (b BoardModel) GetAll() ([]Board, error) {
	jsonData, err := readJSONFile("boards.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var boards []Board
	err = json.Unmarshal(jsonData, &boards)

	return boards, nil
}

func (b BoardModel) GetByID(id string) (*Board, error) {
	jsonData, err := readJSONFile("boards.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var boards []Board
	err = json.Unmarshal(jsonData, &boards)

	for _, board := range boards {
		if board.ID == id {
			return &board, nil
		}
	}

	return &Board{}, nil
}

func (b BoardModel) Update(board *Board) error {
	return nil
}

func (b BoardModel) Delete(board *Board) error {
	return nil
}

/**
* This functionality is here temporary, will be removed once the DB is initialized
 */

func readJSONFile(fileName string) ([]byte, error) {
	file, err := os.Open(fileName)
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		return nil, fmt.Errorf("error opening file: %s", err.Error())
	}
	defer file.Close()

	jsonData, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("error reading file: %s", err.Error())
	}

	return jsonData, nil
}

func writeJSONFile(fileName string, payload interface{}) error {
	jsonData, err := json.MarshalIndent(payload, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshalling json %s", err.Error())
	}

	file, err := os.Create(fileName)
	if err != nil {
		return fmt.Errorf("error creating file %s", err.Error())
	}

	defer file.Close()

	_, err = file.Write(jsonData)
	if err != nil {
		return fmt.Errorf("error writing to file %s", err.Error())
	}

	return nil
}
