import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'
import credentials from '../credentials'

class LoginScreen extends Component {
  state = {
    isSignedIn: false,
    user: {},
  }
  componentDidMount() {
    this.props.githubLogin()
  }
  login = async () => {
    if (!this.props.token) {
      try {
        await this.props.githubLogin()
      } catch (error) {
        console.log(error)
      }
    }
    console.log(this.props.token)
    if (this.props.token) {
      console.log('Got Token')
      this.githubAuthCompleteSetupFirebase(this.props.token)
    }
  }
  githubAuthCompleteSetupFirebase = async (token) => {
    initializeFirebase()
    var credential = firebase.auth.GithubAuthProvider.credential(token)
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then(function (result) {
        if (result.additionalUserInfo.isNewUser) {
          firebase
            .database()
            .ref('/users/' + result.user.uid)
            .set({
              email: result.user.email,
              profile_picture: result.user.photoURL,
              full_name: result.user.displayName,
              created_at: Date.now()
            })
            .then(function (snapshot) {
              console.log('Snapshot', snapshot)
            })
        } else {
          firebase
            .database()
            .ref('/users/' + result.user.uid)
            .update({
              last_logged_in: Date.now()
            });
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title="Login using github" onPress={this.login}></Button>
      </View>
    )
  }
}

function initializeFirebase() {
  if (!firebase.apps.length) {
    return firebase.initializeApp(credentials.firebase)
  }
}

async function signInFirebase(token) {
  try {
    const credential = firebase.auth.GithubAuthProvider.credential(token)
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
    this.githubAuthCompleteSetupFirebase(token)
  } catch ({ message }) {
    console.log(message)
  }
}

async function attemptAuth(token) {
  if (token) {
    return signInFirebase(token)
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
})
export default connect(mapStateToProps, actions)(LoginScreen)
