import { combineReducers } from 'redux'
import auth from './auth_reducer'
import repo from './repo_reducer'

export default combineReducers({
  auth,
  repo
})
