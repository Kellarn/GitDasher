import { SecureStore } from 'expo'
import { AsyncStorage } from 'react-native'

import { fetchCommits, fetchCommitsFulfilled, fetchCommitsRejected } from '../reducers/org_repo_reducer'

export const getCommits = () => {
  return async dispatch => {
    try {
      let token = await SecureStore.getItemAsync('gh_token')
      let url = await AsyncStorage.getItem('currentOrg')

      const res = await fetch(`${url}/repos`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(fetchCommits(true))
       
      const repose = await res.json()
     
      const pArray = repose.filter(async item => {
        const commit = await fetch(`${item.url}/commits`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        const jsonResponseCommits = await commit.json()
      
        if (jsonResponseCommits[0] === undefined) {
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
        
        if (jsonResponseCommits[0] === undefined) {
          return false
        } else {
          console.log(jsonResponseCommits[0])
          let commitObject = { name: jsonResponseCommits[0].author.login, message: jsonResponseCommits[0].commit.message, date: jsonResponseCommits[0].commit.author.date, url: jsonResponseCommits[0].committer.avatar_url, repoName: item.name }
          return commitObject
        }
      })
      const allCommits = await Promise.all(pArray)

      let filterdCommits = allCommits.filter(item => {
        if (item === false) {
          return false
        } else {
          return true
        }
      })
      dispatch(fetchCommitsFulfilled(filterdCommits))
    } catch (error) {
      dispatch(fetchCommitsRejected(error))
    }
  }
}