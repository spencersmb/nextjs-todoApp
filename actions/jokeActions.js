import actionTypes from './actionTypes'
import todosApi from '../api/todosApi'

export const loadJokesSuccess = jokes => {
  return {
    type: actionTypes.LOAD_JOKES_SUCCESS,
    jokes
  }
}

export const getJokes = (token) => (dispatch, getState) => {
  const state = getState()

  if (state.jokes.length > 0) {
    console.log('jokes cached')
    dispatch(loadJokesSuccess(state.jokes))
    return
  }

  return todosApi.getJokes(token).then(jokes => {
    dispatch(loadJokesSuccess(jokes.jokes))
  })
}
