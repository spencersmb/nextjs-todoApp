import actionTypes from './actionTypes'
import todosApi from '../api/todosApi'

export const addTodo = (todo) => dispatch => {
  return todosApi.addTodo(todo).then(res => {
    dispatch(saveTodo(res))
  })
}

export const getTodos = () => dispatch => {
  return todosApi.getTodos().then(todos => {
    dispatch(loadTodosSuccess(todos))
  })
}

export const loadTodosSuccess = todos => {
  return {
    type: actionTypes.LOAD_TODOS_SUCCESS,
    todos
  }
}

export const saveTodo = todo => {
  return {
    type: actionTypes.SAVE_TODO,
    todo
  }
}
