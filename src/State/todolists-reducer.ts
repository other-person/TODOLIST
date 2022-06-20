import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | RemoveTodolistFilterActionType;

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string
    title: string
}
export type RemoveTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    id: string
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id != action.id);
        }
        case 'ADD_TODOLIST': {
            return [...state, {
            id: v1(),
            title: action.title,
            filter: "all"
            }]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]

        }
        case 'CHANGE_TODOLIST_FILTER':{
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: id, title: title}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): RemoveTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', id: id, filter: filter}
}
