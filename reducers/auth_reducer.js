import {
    GITHUB_LOGIN_SUCCESS,
    GITHUB_LOGIN_FAILED
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GITHUB_LOGIN_SUCCESS:
      return { token: action.payload }
    case GITHUB_LOGIN_FAILED:
      return { token: null }
    default:
      return state
  }
}
