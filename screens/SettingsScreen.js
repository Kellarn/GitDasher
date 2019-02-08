import React, { Component } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    // const { state } = navigation
    return {
      title: 'Github settings',
      headerRight:
      <Button 
      title="Notifications" 
      onPress={ () => navigation.navigate('Notifications') } 
      />
    }
    }
  render () {
    return (
      <View style={styles.container}>
        <Text>SettingsScreen</Text> 
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
