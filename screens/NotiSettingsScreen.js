import React, { Component } from 'react'
import {View, Text} from 'react-native'
import firebase from 'firebase'

class NotiSettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings'
    }
  render () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('Logged out')
      SecureStore.deleteItemAsync('gh_token')
    }).catch(function(error) {
      // An error happened.
      console.log(error) 
    })
    return (
      <View>
        <Text>NotiSettingsScreen</Text>
        <Text>NotiSettingsScreen</Text>
        <Text>NotiSettingsScreen</Text>
        <Text>NotiSettingsScreen</Text>
        <Text>NotiSettingsScreen</Text>
      </View>
    )
  }
}

export default NotiSettingsScreen
