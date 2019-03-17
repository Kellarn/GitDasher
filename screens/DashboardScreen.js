import React, { Component } from 'react'
import {View, Text, Button, AsyncStorage, StyleSheet, Image} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'
import credentials from '../credentials'
import { SecureStore } from 'expo';

class DashboardScreen extends Component {
  state = { 
    isSignedIn: false,
    user: {},
    repos:[]
  }
  componentDidMount () {
    this.props.githubLogin()
    this.githubAuthCompleteSetupFirebase(this.props)
    this.props.dispatchRepoData()
  }

  componentWillReceiveProps (nextProps) {
    this.githubAuthCompleteSetupFirebase(nextProps)
  }

  githubAuthCompleteSetupFirebase = async (props) => {
      initializeFirebase()
      // this.props.navigation.navigate('Flow')
      firebase.auth().onAuthStateChanged(async auth => {
        const isSignedIn = !!auth
        this.setState({ isSignedIn })
        if(!isSignedIn) {
          attemptAuth(props.token)
        }
      })
  }
  render () {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {}
      // const data = this.props.dispatchRepoData()
      // // this.setState({user: user})
      // console.log(data)
      console.log(this.props.repo)

    return (
      <View>
        <Image source={{ uri: user.photoURL }} style={styles.image} />
        <Text>Welcome { user.displayName } </Text>
      </View>
    )
    }
    return (
      <View></View>
    )
  }
}

function initializeFirebase () {
  if (!firebase.apps.length) {
    return firebase.initializeApp(credentials.firebase)
  }
}

async function signInFirebase(token) {
  try {
    if(!token) {
      this.props.githubLogin()
      if(token) {
        return signInFirebase(token)
      } else {
        return
      }
    }
    const credential = firebase.auth.GithubAuthProvider.credential(token)
    return firebase.auth().signInAndRetrieveDataWithCredential(credential)
  } catch({ message }) {
    console.log(message)
  }
}

async function attemptAuth(token) {
  if(token) {
    return signInFirebase(token)
  }
}

function mapStateToProps ({ auth, repo }) {
  return { token: auth.token, repo: repo.repoData }
}

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
})
export default connect(mapStateToProps, actions)(DashboardScreen)
