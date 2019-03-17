import {
    GITHUB_GETREPO_SUCCESS,
    GITHUB_GETREPO_FAILED
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GITHUB_GETREPO_SUCCESS:
      return { repoData: action.payload }
    case GITHUB_GETREPO_FAILED:
      return { repoData: null }
    default:
      return state
  }
}
