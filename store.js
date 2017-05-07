import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import actionTypes from './actions/actionTypes'
import { todosReducer } from './reducers/todosReducer'
import { authReducer } from './reducers/authReducer'
import { jokesReducer } from './reducers/jokesReducer'

export const initStore = (initialState = {}) => {

    //mirror of state from original app
    const reducers = combineReducers({
      todos: todosReducer,
      isAuthenticated: authReducer,
      jokes: jokesReducer
    });

  if (typeof window !== 'undefined') {
    
    // const composeEnhancers = composeWithDevTools({
    //   // Specify here name, actionsBlacklist, actionsCreators and other options if needed
    //   actionsBlacklist: ['TICK']
    // });

    return createStore(
      reducers, 
      initialState, 
      composeWithDevTools(
        applyMiddleware(thunkMiddleware)
      )
    )}

  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
  
}
