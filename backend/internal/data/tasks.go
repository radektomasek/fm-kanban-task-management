package data

import (
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"time"
)

type Task struct {
	ID          string    `json:"id"`
	BoardID     string    `json:"boardId"`
	ColumnID    string    `json:"columnId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"-"`
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

	tasks = getTasksByBoardIDAndTaskID(boardID, taskID, tasks)

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
	if result == nil {
		return nil, fmt.Errorf("no element with ID %s found", taskID)
	}

	return &result[0], nil
}

func (t TaskModel) Insert(task *Task, subtasks []Subtask) (*TaskWithSubtasks, error) {
	jsonTaskData, err := readJSONFile("tasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var taskData []Task
	err = json.Unmarshal(jsonTaskData, &taskData)

	if err != nil {
		fmt.Println("Error unmarshalling json: ", err)
		return nil, err
	}

	jsonSubtaskData, err := readJSONFile("subtasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return nil, err
	}

	var subtaskData []Subtask
	err = json.Unmarshal(jsonSubtaskData, &subtaskData)

	if err != nil {
		fmt.Println("Error unmarshalling json: ", err)
		return nil, err
	}

	task.ID = uuid.NewString()
	task.CreatedAt = time.Now()

	for index := range subtasks {
		subtasks[index].ID = uuid.NewString()
		subtasks[index].TaskID = task.ID
		subtasks[index].Completed = false
		subtasks[index].CreatedAt = time.Now()
	}

	taskData = append(taskData, *task)
	err = writeJSONFile("tasks.json", taskData)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return nil, err
	}

	subtaskData = append(subtaskData, subtasks...)
	err = writeJSONFile("subtasks.json", subtaskData)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return nil, err
	}

	return &TaskWithSubtasks{Task: *task, Subtasks: subtasks}, nil
}

func (t TaskModel) Update(payload *Task) (*Task, error) {
	return nil, nil
}

func (t TaskModel) Delete(taskId string) error {
	jsonTaskData, err := readJSONFile("tasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return err
	}

	var taskData []Task
	err = json.Unmarshal(jsonTaskData, &taskData)

	updatedTasks := filterTasksByTaskID(taskId, taskData)
	err = writeJSONFile("tasks.json", updatedTasks)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return err
	}

	jsonSubtaskData, err := readJSONFile("subtasks.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return err
	}

	var subtaskData []Subtask
	err = json.Unmarshal(jsonSubtaskData, &subtaskData)

	updatedSubtasks := filterSubtasksByTaskID(taskId, subtaskData)
	err = writeJSONFile("subtasks.json", updatedSubtasks)
	if err != nil {
		fmt.Println("Error writing file: ", err)
		return err
	}

	return nil
}
