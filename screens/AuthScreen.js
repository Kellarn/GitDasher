import React, { Component } from 'react'
import {View, Text, Button, AsyncStorage, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'

class AuthScreen extends Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        console.log('Hello Dash')
        this.props.navigation.navigate('Dashboard')
      } else {
        console.log('Hello Login')
        this.props.navigation.navigate('Login')
      }
    })
  }
  componentDidMount () {
  this.checkIfLoggedIn()
  }

  render () {
    return (
      <View>
      <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen)
