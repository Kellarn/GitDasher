import { SecureStore } from 'expo'
import { AsyncStorage } from 'react-native'
import { fetchAllAdminRepos, fetchAllAdminReposFulfilled, fetchAllAdminReposRejected } from '../reducers/notification_repo_reducer'

export const getMyRepos = () => {
  return async dispatch => {
    try {
      console.log('hello')
      let token = await SecureStore.getItemAsync('gh_token')

      const res = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(fetchAllAdminRepos(true))
      const jsonResponse = await res.json()

      let filterdRepos = jsonResponse.filter(item => {
        if (item.permissions.admin === false) {
          return false
        } else {
          return true
        }
      })

      let mappedRepos = filterdRepos.map(item => {
        const mappedReturnObject = { name: item.full_name, hooksUrl: item.hooks_url}
        return mappedReturnObject
      })
      console.log(mappedRepos)
      dispatch(fetchAllAdminReposFulfilled(mappedRepos))
    } catch (error) {
      console.log(error)
      dispatch(fetchAllAdminReposRejected(error))
    }
  }
}