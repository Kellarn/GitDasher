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
  // console.log(json)
  if (jsonResponse) {
    let returns = [{name: 'Pick an org', imgUrl: ''}]
    // jsonResponse.foreach(function (item) {
    Object.keys(jsonResponse).forEach(async function (item) {
      let returnObject = {name: '', imgUrl: '', url: ''}
      returnObject.name = jsonResponse[item].login
      returnObject.imgUrl = jsonResponse[item].avatar_url
      returnObject.url = jsonResponse[item].url
      console.log(returnObject)
        // // const resStats = await fetch(`${jsonResponse[item].url}/stats/punch_card`, {
        // //   method: 'GET',
        // //   headers: {
        // //     Authorization: 'Bearer ' + token
        // //   }
        // // })
        // // const jsonResponseStats = await resStats.json()
        // // console.log(jsonResponseStats)
        // let dayIndex = 0
        // let counter = 0
        // Object.keys(jsonResponseStats).forEach(async function (item) {
        //   if (dayIndex === jsonResponseStats[item][0]) {
        //     counter += jsonResponseStats[item][2]
        //   } else {
        //     let dayArray = []
        //     dayArray.push(dayIndex)
        //     dayArray.push(counter)
        //     dayIndex++
        //     counter = 0
        //     returns.push(dayArray)
        //   }
        //   // console.log(returns)
        // })
      // let name = jsonResponse[item].login
        // console.log(jsonResponseStats)
      returns.push(returnObject)
    })
    console.log(returns)
    // })
    // console.log('Hello')
    dispatch({ type: GITHUB_GETORG_SUCCESS, payload: returns })
  } else {
    // console.log('Not Hello')
    dispatch({ type: GITHUB_GETORG_FAILED, payload: null })
  }
}
export const dispatchOrgData = () => async dispatch => {
  let token = await SecureStore.getItemAsync('gh_token')
  // console.log(token)
  if (token) {
                // Dispatch an action for Github login is done.
    // dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: token })
    getOrgData(dispatch, token)
  } else {
                // Start Github login
    // getRepoData(dispatch, token)
    dispatch({ type: GITHUB_GETORG_FAILED })
  }
}
