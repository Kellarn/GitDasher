import {
    GITHUB_GETREPO_SUCCESS,
    GITHUB_GETREPO_FAILED,
    GITHUB_GETREPO_GETTING
} from '../actions/types'

const initialState = {
  commits: [],
  loading: true,
  errorMessage: ''
}

const orgRepo = (state = initialState, action) => {
  let newLoading = action.loading
  switch (action.type) {
    case GITHUB_GETREPO_SUCCESS:
      return { ...state, orgRepoData: action.payload, loading: newLoading }
    case GITHUB_GETREPO_GETTING:
      return {...state, loading: newLoading}
    case GITHUB_GETREPO_FAILED:
      return { ...state, orgRepoData: action.payload, loading: newLoading }
    default:
      return state
  }
}

export const fetchCommits = (bool) => {
  return {
    type: GITHUB_GETREPO_GETTING,
    payload: bool
  }
}
export const fetchCommitsFulfilled = (data) => {
  console.log('DONE!')
  return {
    type: GITHUB_GETREPO_SUCCESS,
    payload: data,
    loading: false
  }
}
export const fetchCommitsRejected = (error) => {
  return {
    type: GITHUB_GETREPO_FAILED,
    payload: error,
    loading: false
  }
}

export default orgRepo
