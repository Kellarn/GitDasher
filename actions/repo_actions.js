import { SecureStore } from 'expo'
import credentials from '../credentials'
import {
    GITHUB_GETREPO_SUCCESS,
    GITHUB_GETREPO_FAILED
} from './types'

const getRepoData = async (dispatch, token) => {
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  const json = await res.json()
  // console.log(json)
  if (json) {
    // console.log('Hello')
    dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: json })
  } else {
    // console.log('Not Hello')
    dispatch({ type: GITHUB_GETREPO_FAILED, payload: null })
  }
}
export const dispatchRepoData = () => async dispatch => {
  let token = await SecureStore.getItemAsync('gh_token')
  // console.log(token)
  if (token) {
                // Dispatch an action for Github login is done.
    // dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: token })
    getRepoData(dispatch, token)
  } else {
                // Start Github login
    // getRepoData(dispatch, token)
    dispatch({ type: GITHUB_GETREPO_FAILED })
  }
}
