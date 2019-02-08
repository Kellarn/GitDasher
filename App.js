import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import GithubFlowScreen from './screens/GithubFlowScreen'
import DashboardScreen from './screens/DashboardScreen'
import SettingsScreen from './screens/SettingsScreen'
import NotiSettingsScreen from './screens/NotiSettingsScreen'

class IconWithBadge extends React.Component {
  render () {
    const { name, badgeCount, color, size } = this.props
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={1} />
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state
  let IconComponent = Ionicons
  let iconName
  if (routeName === 'Welcome') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge
  } else if (routeName === 'Auth') {
    iconName = `ios-help-circle${focused ? '' : '-outline'}`
  } else if (routeName === 'Main') {
    iconName = 'ios-apps'
  } else if (routeName === 'Settings') {
    iconName = 'ios-options'
  } else if (routeName === 'Flow') {
    iconName = 'ios-code-download'
  } else if (routeName === 'Dashboard') {
    iconName = 'ios-github'
  } else if (routeName === 'Notifications') {
    iconName = 'ios-switch'
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />
}

const WelcomeStack = createBottomTabNavigator({
  Welcome: { screen: WelcomeScreen },
  Auth: { screen: AuthScreen }
})

const DashboardStack = createBottomTabNavigator({
  Flow: {screen: GithubFlowScreen},
  Dashboard: { screen: DashboardScreen }
})

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Notifications: { screen: NotiSettingsScreen }
})

export default createAppContainer(
  createBottomTabNavigator(
    {
      Welcome: WelcomeStack,
      DashBoard: DashboardStack,
      Settings: SettingsStack
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
      }
    }
  )
)
