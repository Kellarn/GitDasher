import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'
import credentials from '../credentials'
import { SecureStore } from 'expo';

class LoginScreen extends Component {
    state = {
        isSignedIn: false,
        user: {},
    }
    componentDidMount() {
        this.props.githubLogin()
        // this.githubAuthCompleteSetupFirebase(this.props)
        // this.props.dispatchRepoData()
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
        //   await this.githubAuthCompleteSetupFirebase(this.props)
    }
    //   componentWillReceiveProps (nextProps) {
    //     this.githubAuthCompleteSetupFirebase(nextProps)
    //   }

    githubAuthCompleteSetupFirebase = async (token) => {
        initializeFirebase()
        // this.props.navigation.navigate('Flow')
        var credential = firebase.auth.GithubAuthProvider.credential(token)
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(function (result) {
                console.log(result)
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
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
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

function mapStateToProps({ auth}) {
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
