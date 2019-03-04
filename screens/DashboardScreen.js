import React, { Component } from 'react'
import {View, Text, Button, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'
import credentials from '../credentials'

class DashboardScreen extends Component {
  componentDidMount () {
    this.props.githubLogin()
    this.onAuthComplete(this.props)
    AsyncStorage.removeItem('gh_token')
  }

  componentWillReceiveProps (nextProps) {
    this.onAuthComplete(nextProps)
  }

  onAuthComplete (props) {
    if (props.token) {
      // this.props.navigation.navigate('Flow')
      const credential = firebase.auth.GithubAuthProvider.credential(props.token)
    }
  }
  render () {
    return (
      <View />
    )
  }
}

function initializeFirebase () {
  if (!firebase.apps.length) {
    return firebase.initializeApp(credentials.firebase)
  }
}

function mapStateToProps ({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(DashboardScreen)
