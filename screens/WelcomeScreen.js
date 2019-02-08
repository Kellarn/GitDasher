import React, { Component } from 'react'
import {View, Text, Button} from 'react-native'

class WelcomeScreen extends Component {
  render () {
    return (
      <View>
        <Text>WelcomeScreen</Text>
        <Button
          title='Go to Auth'
          onPress={() => this.props.navigation.navigate('Auth')}
        />
      </View>
    )
  }
}

export default WelcomeScreen
