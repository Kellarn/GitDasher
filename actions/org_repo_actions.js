import { SecureStore } from 'expo'
import { AsyncStorage } from 'react-native'

import { fetchCommits, fetchCommitsFulfilled, fetchCommitsRejected } from '../reducers/org_repo_reducer'

export const getCommits = () => {
  // IN order to use await your callback must be asynchronous using async keyword.
  return async dispatch => {
      // Then perform your asynchronous operations.
    try {
      let token = await SecureStore.getItemAsync('gh_token')
      let url = await AsyncStorage.getItem('currentOrg')
          // Have it first fetch data from our starwars url.
      const res = await fetch(`${url}/repos`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(fetchCommits(true))
          // Then use the json method to get json data from api/
      const repose = await res.json()
      // console.log('Commits-----------', repose)
          // Now when the data is retrieved dispatch an action altering redux state.
      const pArray = repose.filter(async item => {
        console.log(item)
        const commit = await fetch(`${item.url}/commits`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        const jsonResponseCommits = await commit.json()
        // console.log(jsonResponseCommits[0])
        if (jsonResponseCommits[0] === undefined) {
          console.log('Undefined?')
          return false
        } else {
          return true
        }
      })
      .map(async item => {
        const commit = await fetch(`${item.url}/commits`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        const jsonResponseCommits = await commit.json()
        // console.log(jsonResponseCommits[0])
        if (jsonResponseCommits[0] === undefined) {
          console.log('Undefined?')
          return false
        } else {
          let commitObject = { name: jsonResponseCommits[0].author.login, message: jsonResponseCommits[0].commit.message, date: jsonResponseCommits[0].commit.author.date, url: jsonResponseCommits[0].committer.avatar_url, repoName: item.name }
          return commitObject
        }
      })
      const allCommits = await Promise.all(pArray)
      // Object.keys(repose).forEach(async function (item) {
      //   console.log(repose[item].commits_url)
      //   const commit = await fetch(`${repose[item].url}/commits`, {
      //     method: 'GET',
      //     headers: {
      //       Authorization: 'Bearer ' + token
      //     }
      //   })
      //   const jsonResponseCommits = await commit.json()
      //   // console.log(jsonResponseCommits[0])
      //   if (jsonResponseCommits[0] === undefined) {
      //     console.log('Undefined?')
      //   } else {
      //     let commitObject = { name: jsonResponseCommits[0].author.login, message: jsonResponseCommits[0].message, date: jsonResponseCommits[0].commit.date }
      //     commitObjects = commitObjects.push(commitObject)
      //   }
      // })

      let filterdCommits = allCommits.filter(item => {
        if (item === false) {
          return false
        } else {
          return true
        }
      })
      console.log(filterdCommits)
      dispatch(fetchCommitsFulfilled(filterdCommits))
    } catch (error) {
      console.log('Getting People Error---------', error)
      dispatch(fetchCommitsRejected(error))
    }
  }
}

// import { SecureStore } from 'expo'
// import { AsyncStorage } from 'react-native'
// import {
//     GITHUB_GETREPO_SUCCESS,
//     GITHUB_GETREPO_FAILED
// } from './types'

// const getRepoData = async (dispatch, token, url) => {
//   const res = await fetch(`${url}/repos`, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token
//     }
//   })
//   const jsonResponse = await res.json()
//   let commitObjects = []
//   // console.log(json)
//   if (jsonResponse) {
//     // console.log(jsonResponse)
// //     let returns = [{name: 'Pick an org', imgUrl: ''}]
// //     // jsonResponse.foreach(function (item) {

//     Object.keys(jsonResponse).forEach(async function (item) {
//       console.log(jsonResponse[item].commits_url)
//       const commit = await fetch(`${jsonResponse[item].url}/commits`, {
//         method: 'GET',
//         headers: {
//           Authorization: 'Bearer ' + token
//         }
//       })
//       const jsonResponseCommits = await commit.json()
//       // console.log(jsonResponseCommits[0])
//       if (jsonResponseCommits[0] === undefined) {
//         console.log('Undefined?')
//       } else {
//         let commitObject = { name: jsonResponseCommits[0].author.login, message: jsonResponseCommits[0].message, date: jsonResponseCommits[0].commit.date }
//         console.log(commitObject)
//         commitObjects.push(commitObject)
//       }
//       // console.log(commitObjects.length)
//       // console.log(jsonResponseCommits[0].author.login)
//       // console.log(commitObjects.length)
//     })
//   } else {
//     // console.log('Not Hello')
//     dispatch({ type: GITHUB_GETREPO_FAILED, payload: null })
//   }
//   dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: commitObjects })
// }
// export const getOrgRepos = () => async dispatch => {
//   let token = await SecureStore.getItemAsync('gh_token')
//   let url = await AsyncStorage.getItem('currentOrg')
//   // console.log(token)
//   if (token) {
//                 // Dispatch an action for Github login is done.
//     // dispatch({ type: GITHUB_GETREPO_SUCCESS, payload: token })
//     getRepoData(dispatch, token, url)
//   } else {
//                 // Start Github login
//     // getRepoData(dispatch, token)
//     dispatch({ type: GITHUB_GETREPO_FAILED })
//   }
// }
