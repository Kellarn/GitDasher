import { SecureStore } from 'expo'
import { AsyncStorage } from 'react-native'
import {
    GITHUB_GETREPO_SUCCESS,
    GITHUB_GETREPO_FAILED
} from './types'

const getRepoData = async (dispatch, token, url) => {
  const res = await fetch(`${url}/repos`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  const jsonResponse = await res.json()
  // console.log(json)
  if (jsonResponse) {
    console.log(jsonResponse)
//     let returns = [{name: 'Pick an org', imgUrl: ''}]
//     // jsonResponse.foreach(function (item) {
    Object.keys(jsonResponse).forEach(async function (item) {
      console.log(jsonResponse[item].commits_url)
      const commit = await fetch(`${jsonResponse[item].url}/commits`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      const jsonResponseCommits = await commit.json()
      console.log(jsonResponseCommits[0])
    })
    dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: jsonResponse })
  } else {
    // console.log('Not Hello')
    dispatch({ type: GITHUB_GETREPO_FAILED, payload: null })
  }
}
export const getOrgRepos = () => async dispatch => {
  let token = await SecureStore.getItemAsync('gh_token')
  let url = await AsyncStorage.getItem('currentOrg')
  // console.log(token)
  if (token) {
                // Dispatch an action for Github login is done.
    // dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: token })
    getRepoData(dispatch, token, url)
  } else {
                // Start Github login
    // getRepoData(dispatch, token)
    dispatch({ type: GITHUB_GETREPO_FAILED })
  }
}
