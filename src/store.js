import { createStore, combineReducers } from 'redux'

// actionType
const INITTYPE = 'INIT'
const LOGIN = 'LOGIN'

// action
export const init = () => ({
  type: INITTYPE,
})

export const login = () => ({
  type: LOGIN,
})

// function reducer
const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case INITTYPE:
      return true
    case LOGIN:
      return true
    default: return state
  }
}

// common reducer
const reducer = combineReducers({
  loggedIn: sessionReducer,
})

// common export
export default initState => createStore(reducer, initState)
