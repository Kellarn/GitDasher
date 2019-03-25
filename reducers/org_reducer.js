import {
    GITHUB_GETORG_SUCCESS,
    GITHUB_GETORG_FAILED
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GITHUB_GETORG_SUCCESS:
      return { orgData: action.payload }
    case GITHUB_GETORG_FAILED:
      return { orgData: null }
    default:
      return state
  }
}
