import React, { Component } from 'react'
import {View, Text, Button} from 'react-native'

class AuthScreen extends Component {
  render () {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Button
          title='Go to Dashboard'
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    )
  }
}

export default AuthScreen
