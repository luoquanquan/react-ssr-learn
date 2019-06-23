import { createStore, combineReducers } from 'redux'

// actionType
const INITTYPE = 'INIT'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// action
export const init = () => ({
  type: INITTYPE,
})

export const logIn = () => ({
  type: LOGIN,
})

export const logOut = () => ({
  type: LOGOUT,
})

// function reducer
const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case INITTYPE:
      return true
    case LOGIN:
      return true
    case LOGOUT:
      return false
    default: return state
  }
}

// common reducer
const reducer = combineReducers({
  loggedIn: sessionReducer,
})

// common export
export default initState => createStore(reducer, initState)
