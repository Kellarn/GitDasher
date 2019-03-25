
import { AuthSession, SecureStore } from 'expo'
import credentials from '../credentials'
import {
    GITHUB_LOGIN_SUCCESS,
    GITHUB_LOGIN_FAILED
} from './types'

const CLIENT_ID = credentials.github.clientId
const CLIENT_SECRET = credentials.github.clientSecret
const githubFields = [
  'user',
  'public_repo',
  'repo',
  'repo_deployment',
  'repo:status',
  'read:repo_hook',
  'read:org',
  'read:public_key',
  'read:gpg_key'
]

const REDIRECT_URL = AuthSession.getRedirectUrl()
// const AUTH_URL =
//   'https://github.com/login/oauth/authorize' +
//   `?client_id=${CLIENT_ID}` +
//   `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`

const authUrlWithId = (id, fields) => {
  return (
      `https://github.com/login/oauth/authorize` +
      `?client_id=${id}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
      `&scope=${encodeURIComponent(fields.join(' '))}`
  )
}
const doGithubLogin = async dispatch => {
  const { type, params } = await AuthSession.startAsync({
    authUrl: authUrlWithId(CLIENT_ID, githubFields)
  })
  console.log('githubTokenAsync: A: ', { type, params })

  if (type !== 'success') {
    return dispatch({ type: GITHUB_LOGIN_FAILED })
  }

  const code = params.code
  const { token_type, scope, access_token } = await createTokenWithCode(code)
  console.log('getGithubTokenAsync: B: ', {
    token_type,
    scope,
    access_token
  })
  await SecureStore.setItemAsync('gh_token', access_token)
  dispatch({ type: GITHUB_LOGIN_SUCCESS, payload: access_token })
}

const createTokenWithCode = async code => {
  const url =
      'https://github.com/login/oauth/access_token' +
      `?client_id=${CLIENT_ID}` +
      `&client_secret=${CLIENT_SECRET}` +
      `&code=${code}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export const githubLogin = () => async dispatch => {
  let token = await SecureStore.getItemAsync('gh_token')
  console.log(token)
  if (token) {
              // Dispatch an action for Github login is done.
    dispatch({ type: GITHUB_LOGIN_SUCCESS, payload: token })
  } else {
              // Start Github login
    doGithubLogin(dispatch)
  }
}
