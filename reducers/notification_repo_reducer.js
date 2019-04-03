import {
    GITHUB_GETALLMYREPOS_SUCCESS,
    GITHUB_GETALLMYREPOS_FAILED,
    GITHUB_GETALLMYREPOS_GETTING
} from '../actions/types'

const initialState = {
  adminRepos: [],
  loading: true,
  errorMessage: ''
}

const adminRepos = (state = initialState, action) => {
  let newLoading = action.loading
  switch (action.type) {
    case GITHUB_GETALLMYREPOS_SUCCESS:
      return { ...state, adminRepos: action.payload, loading: newLoading }
    case GITHUB_GETALLMYREPOS_GETTING:
      return {...state, loading: newLoading}
    case GITHUB_GETALLMYREPOS_FAILED:
      return { ...state, adminRepos: action.payload, loading: newLoading }
    default:
      return state
  }
}

export const fetchAllAdminRepos = (bool) => {
    console.log('Working?')
  return {
    type: GITHUB_GETALLMYREPOS_GETTING,
    payload: bool
  }
}
export const fetchAllAdminReposFulfilled = (data) => {
  console.log('DONE!')
  return {
    type: GITHUB_GETALLMYREPOS_SUCCESS,
    payload: data,
    loading: false
  }
}
export const fetchAllAdminReposRejected = (error) => {
  return {
    type: GITHUB_GETALLMYREPOS_FAILED,
    payload: error,
    loading: false
  }
}

export default adminRepos
