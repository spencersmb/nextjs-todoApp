import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todosApi from './api/todosApi'
import { composeWithDevTools } from 'redux-devtools-extension';
import { logout } from './utils/lock'
import { loggedUser } from './utils/auth'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  todos:[
    {
      text: "initial state todo"
    }
  ],
  jokes:[],
  isAuthenticated: false
}

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  TOGGLE_TODO: 'TOGGLE_TODO',
  TOGGLE_LOGIN: 'TOGGLE_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOG_OUT: 'LOG_OUT',
  LOAD_TODOS_SUCCESS: 'LOAD_TODOS_SUCCESS',
  LOAD_JOKES_SUCCESS: 'LOAD_JOKES_SUCCESS'
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
    case actionTypes.TOGGLE_LOGIN:
      return Object.assign({}, state, {
        isAuthenticated: !state.isAuthenticated
      })
    case actionTypes.LOAD_JOKES_SUCCESS:
    console.log('jokes reducer firing')
      return Object.assign({}, state, {
        jokes: action.jokes
      })
    case actionTypes.LOGIN_SUCCESS:
    console.log('Login')
      return Object.assign({}, state, {
          isAuthenticated: true
        })
    case actionTypes.LOG_OUT:
    console.log('log out')
      return Object.assign({}, state, {
          isAuthenticated: false
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

export const toggleLogin = (isAuthenticated) => {
    console.log('toggle login action', isAuthenticated);
    if(isAuthenticated){
      return {
        type: actionTypes.LOGIN_SUCCESS
      }
    }else {
      return {
        type: actionTypes.LOG_OUT
      }
    }
};

export const logUser_in = () => dispatch => {
  return { type: actionTypes.LOGIN_SUCCESS }
}

export const authenticateUser = () => dispatch => {
  console.log('signed in page fire auth user')
  return dispatch({ type: actionTypes.LOGIN_SUCCESS })
}

export const logUser_out = () => {
  return { type: actionTypes.LOG_OUT }
}

export const checkUserLogin = (logged) => dispatch => {

  return todosApi.loggedUser(logged).then( res => {
    (res) ? dispatch(logUser_in()) : dispatch(logUser_out())
  })
}

export const loadTodosSuccess = todos => {
  return {
    type: actionTypes.LOAD_TODOS_SUCCESS,
    todos
  };
};

export const loadJokesSuccess = jokes => {
  return {
    type: actionTypes.LOAD_JOKES_SUCCESS,
    jokes
  };
};

export const getTodos = () => dispatch => {
  
  return todosApi.getTodos().then( todos => {
    dispatch(loadTodosSuccess(todos))
  })

}

export const getJokes = (token) => (dispatch, getState) => {
  
  const state = getState();

  if(state.jokes.length > 0){
    console.log('jokes cached')
    dispatch(loadJokesSuccess(state.jokes))
    return
  }

  return todosApi.getJokes(token).then( jokes => {
    dispatch(loadJokesSuccess(jokes.jokes))
  })
}

export const initStore = (initialState = exampleInitialState) => {

  if (typeof window !== 'undefined') {
    
    // const composeEnhancers = composeWithDevTools({
    //   // Specify here name, actionsBlacklist, actionsCreators and other options if needed
    //   actionsBlacklist: ['TICK']
    // });

    return createStore(
      reducer, 
      initialState, 
      composeWithDevTools(
        applyMiddleware(thunkMiddleware)
      )
    )}

  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  
}
