import { SecureStore } from 'expo'
import { AsyncStorage } from 'react-native'

import { fetchAllAdminRepos, fetchAllAdminReposFulfilled, fetchAllAdminReposRejected } from '../reducers/org_repo_reducer'

export const getMyRepos = () => {
    return async dispatch => {
        try {
            dispatch(fetchAllAdminRepos(true))
            dispatch(fetchAllAdminReposFulfilled({name: 'Hello'}))
        } catch (error) {
            dispatch(fetchAllAdminReposRejected(error))
        }
    }
}