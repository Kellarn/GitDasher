import React, { Component } from 'react'
import {View, Text, Button, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'

class AuthScreen extends Component {
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
      this.props.navigation.navigate('Flow')
    }
  }
  render () {
    return (
      <View />
    )
  }
}

function mapStateToProps ({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen)
