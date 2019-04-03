import { SecureStore } from 'expo'
import {
    GITHUB_GETORG_SUCCESS,
    GITHUB_GETORG_FAILED
} from './types'

const getOrgData = async (dispatch, token) => {
  const res = await fetch('https://api.github.com/user/orgs', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  const jsonResponse = await res.json()

  if (jsonResponse) {
    let returns = [{name: 'Pick an org', imgUrl: ''}]

    Object.keys(jsonResponse).forEach(async function (item) {
      let returnObject = {name: '', imgUrl: '', url: ''}
      returnObject.name = jsonResponse[item].login
      returnObject.imgUrl = jsonResponse[item].avatar_url
      returnObject.url = jsonResponse[item].url

      returns.push(returnObject)
    })
    dispatch({ type: GITHUB_GETORG_SUCCESS, payload: returns })
  } else {
    dispatch({ type: GITHUB_GETORG_FAILED, payload: null })
  }
}
export const dispatchOrgData = () => async dispatch => {
  let token = await SecureStore.getItemAsync('gh_token')

  if (token) {
    getOrgData(dispatch, token)
  } else {
    dispatch({ type: GITHUB_GETORG_FAILED })
  }
}
