import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case
        'REMOVE-TASK': {
            let copyState = {...state} // делаем копию стейта
            const tasks = copyState[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks
            return copyState
        }
        case
        'ADD-TASK': {
            const copyState = {...state} // делаем копию стейта
            const tasks = copyState[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            copyState[action.todolistId] = newTasks;
            return copyState
        }
        case
        'CHANGE-TASK-STATUS': {
            const copyState = {...state} // делаем копию стейта
            const tasks = copyState[action.todolistId]
            const task = tasks.find(t => t.id == action.taskId)
            if (task) {
                task.isDone = action.isDone;
            }
            return copyState
        }
        case
        'CHANGE-TASK-TITLE': {
            const copyState = {...state} // делаем копию стейта
            const tasks = copyState[action.todolistId]
            const task = tasks.find(t => t.id == action.taskId)
            if (task) {
                task.title = action.title;
            }
            return copyState
        }
        case
        'CHANGE-TASK-TITLE': {
            const copyState = {...state} // делаем копию стейта
            return copyState
        }
        case
        'ADD-TODOLIST' : {
            const copyState = {...state} // делаем копию стейта

            copyState[action.todolistId] = [];

            return copyState;
        }
        case
        'REMOVE-TODOLIST' : {
            const copyState = {...state} // делаем копию стейта

            delete copyState[action.id]

            return copyState
        }


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, isDone, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}

export const AddTodolistAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
