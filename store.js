import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todosApi from './api/todosApi'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  todos:[
    {
      text: "initial state todo"
    }
  ]
}

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  TOGGLE_TODO: 'TOGGLE_TODO',
  LOAD_TODOS_SUCCESS: 'LOAD_TODOS_SUCCESS'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, { lastUpdate: action.ts, light: !!action.light })
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case actionTypes.TOGGLE_TODO:
      return state;
    case actionTypes.LOAD_TODOS_SUCCESS:
      return Object.assign({}, state, {
        todos: action.todos
      })
    default: return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: 'TICK', light: true, ts: Date.now() }), 800)
}

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}

export const toggleTodo = () => dispatch => {
  return dispatch({ type: actionTypes.TOGGLE_TODO })
}

export const loadTodosSuccess = todos => {
  return {
    type: actionTypes.LOAD_TODOS_SUCCESS,
    todos
  };
};

export const getTodos = () => dispatch => {
  
  return todosApi.getTodos().then( todos => {
    dispatch(loadTodosSuccess(todos))
  })
}

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}
