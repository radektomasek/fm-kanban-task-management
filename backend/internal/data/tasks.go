package data

import (
	"encoding/json"
	"fmt"
	"time"
)

type Task struct {
	ID        string    `json:"id"`
	BoardID   string    `json:"boardId"`
	ColumnID  string    `json:"columnId"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"-"`
}

type Subtask struct {
	ID        string    `json:"id"`
	TaskID    string    `json:"taskId"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"-"`
}

type AggregatedSubtasks struct {
	Total     int `json:"total"`
	Completed int `json:"completed"`
}

type TaskWithSubtasks struct {
	Task
	Subtasks []Subtask `json:"subtasks"`
}

type TaskWithAggregatedSubtasks struct {
	Task
	Subtasks AggregatedSubtasks `json:"subtasks"`
}

type TaskModel struct{}

func (t TaskModel) GetTasksByBoardID(boardId string) ([]TaskWithAggregatedSubtasks, error) {
	jsonData, err := readJSONFile("tasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var tasks []Task
	err = json.Unmarshal(jsonData, &tasks)

	if err != nil {
		fmt.Println("Error unmarshalling json: ", err)
		return nil, err
	}

	if tasks == nil {
		tasks = []Task{}
	}

	tasks = filterTasksByBoardID(boardId, tasks)

	jsonData, err = readJSONFile("subtasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var subtasks []Subtask
	err = json.Unmarshal(jsonData, &subtasks)

	if err != nil {
		fmt.Println("Error unmarshalling json: ", err)
		return nil, err
	}

	if subtasks == nil {
		subtasks = []Subtask{}
	}

	mergedData := mergeTasksAndSubtasks(tasks, subtasks)

	result := getTasksAndAggregatedSubtasks(mergedData)

	return result, nil
}

func (t TaskModel) GetTaskByID(boardID string, taskID string) (*TaskWithSubtasks, error) {
	jsonData, err := readJSONFile("tasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var tasks []Task
	err = json.Unmarshal(jsonData, &tasks)

	if err != nil {
		fmt.Println("Error unmarshalling json: ", err)
		return nil, err
	}

	if tasks == nil {
		tasks = []Task{}
	}

	tasks = filterTasksByBoardIDAndTaskID(boardID, taskID, tasks)

	jsonData, err = readJSONFile("subtasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var subtasks []Subtask
	err = json.Unmarshal(jsonData, &subtasks)

	if err != nil {
		fmt.Println("Error unmarshalling json: ", err)
		return nil, err
	}

	if subtasks == nil {
		subtasks = []Subtask{}
	}

	mergedData := mergeTasksAndSubtasks(tasks, subtasks)

	result := getTasksWithSubtasks(mergedData)
	if len(result) == 0 {
		return nil, fmt.Errorf("no element with ID %s found", taskID)
	}

	return &result[0], nil
}

func (t TaskModel) Insert(task *Task) error {
	return nil
}

func (t TaskModel) Update(payload *Task) (*Task, error) {
	return nil, nil
}

func (t TaskModel) Delete(task *Task) error {
	return nil
}
