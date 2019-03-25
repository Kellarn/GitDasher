import { combineReducers } from 'redux'
import auth from './auth_reducer'
import org from './org_reducer'
import currentOrg from './current_org_reducer'
import orgRepo from './org_repo_reducer'

export default combineReducers({
  auth,
  org,
  currentOrg,
  orgRepo
})
