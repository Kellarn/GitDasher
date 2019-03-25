import React, { Component } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import firebase from 'firebase'
import { SecureStore } from 'expo'


class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Github settings',
      headerRight:
        <Button
          title="Notifications"
          onPress={() => navigation.navigate('Notifications')}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
    }
  }
  // componentDidMount() {
  //   let token = SecureStore.getItemAsync('gh_token')
  //   console.log(token)
  // }
   logout = async () => {

    try {
      await SecureStore.deleteItemAsync('gh_token')
    } catch(error) {
      console.log(error)
    }
    firebase.auth().signOut()
    this.props.navigation.navigate('LoginScreen') 
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>SettingsScreen</Text>
        <Button title="Logout" onPress={this.logout}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default SettingsScreen
