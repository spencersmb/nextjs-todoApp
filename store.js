import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { todosReducer } from './reducers/todosReducer'
import { authReducer } from './reducers/authReducer'
import { jokesReducer } from './reducers/jokesReducer'
import { reducer as formReducer } from 'redux-form';


export const initStore = (initialState = {}) => {
    // mirror of state from original app
  const reducers = combineReducers({
    todos: todosReducer,
    user: authReducer,  
    jokes: jokesReducer,
    form: formReducer
  })

  
  let env = process.env.NODE_ENV || 'development'

  if (typeof window !== 'undefined' && env === 'development' ) {
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
    )
  }

  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
}
