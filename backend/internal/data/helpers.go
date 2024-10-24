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

func mergeTasksAndSubtasks(tasks []Task, subtasks []Subtask) map[string]TaskWithSubtasks {
	var result map[string]TaskWithSubtasks
	result = make(map[string]TaskWithSubtasks)

	for _, task := range tasks {
		var tasksWithSubtasks TaskWithSubtasks
		tasksWithSubtasks.Task = task

		for _, subtask := range subtasks {
			if subtask.TaskID == task.ID {
				tasksWithSubtasks.Subtasks = append(tasksWithSubtasks.Subtasks, subtask)
			}
		}

		result[task.ID] = tasksWithSubtasks
	}

	return result
}

func filterTasksByBoardID(boardID string, tasks []Task) []Task {
	var result []Task

	for _, task := range tasks {
		if task.BoardID == boardID {
			result = append(result, task)
		}
	}

	return result
}

func getTasksByBoardIDAndTaskID(boardID string, taskID string, tasks []Task) []Task {
	var result []Task

	for _, task := range tasks {
		if task.BoardID == boardID && task.ID == taskID {
			result = append(result, task)
		}
	}

	return result
}

func filterTasksByTaskID(taskID string, tasks []Task) []Task {
	var result []Task

	for _, task := range tasks {
		if task.ID != taskID {
			result = append(result, task)
		}
	}

	return result
}

func filterSubtasksByTaskID(taskID string, subtasks []Subtask) []Subtask {
	var result []Subtask

	for _, subtask := range subtasks {
		if subtask.TaskID != taskID {
			result = append(result, subtask)
		}
	}

	return result
}

func getTasksWithSubtasks(data map[string]TaskWithSubtasks) []TaskWithSubtasks {
	var result []TaskWithSubtasks

	for _, taskWithSubtasks := range data {
		result = append(result, taskWithSubtasks)
	}

	return result
}

func getTasksAndAggregatedSubtasks(data map[string]TaskWithSubtasks) []TaskWithAggregatedSubtasks {
	var result []TaskWithAggregatedSubtasks

	for _, taskWithSubtasks := range data {
		totalSubtasks := len(taskWithSubtasks.Subtasks)
		completedSubtasks := 0

		for _, subtask := range taskWithSubtasks.Subtasks {
			if subtask.Completed {
				completedSubtasks++
			}
		}

		aggregatedSubtasks := AggregatedSubtasks{
			Total:     totalSubtasks,
			Completed: completedSubtasks,
		}

		taskWithAggregatedSubtasks := TaskWithAggregatedSubtasks{
			Task:     taskWithSubtasks.Task,
			Subtasks: aggregatedSubtasks,
		}

		result = append(result, taskWithAggregatedSubtasks)
	}

	return result
}
