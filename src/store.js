import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import getMockData from './mockData'

// actionType
// session
const INITTYPE = 'INIT'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// song
const INITSONGLIST = 'INITSONGLIST'

// action
export const init = () => ({
  type: INITTYPE,
})

export const logIn = () => ({
  type: LOGIN,
})

export const logOut = () => ({ type: LOGOUT })

export const initSongList = list => ({ type: INITSONGLIST, list })

// 把歌曲列表添加到 store 里边
const storeData = list => ({ type: INITSONGLIST, list })

export const fetchData = () => dispatch => getMockData().then(data => dispatch(storeData(data)))

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

const songListReducer = (state = [], action) => {
  switch (action.type) {
    case INITSONGLIST:
      return action.list
    default: return state
  }
}

// common reducer
const reducer = combineReducers({
  loggedIn: sessionReducer,
  songList: songListReducer,
})

// common export
export default initState => createStore(
  reducer,
  initState,
  applyMiddleware(thunkMiddleware),
)
