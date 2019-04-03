import React from 'react'
import { StyleSheet, Text, View, YellowBox } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'

import store from './store'
import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import GithubFlowScreen from './screens/GithubFlowScreen'
import DashboardScreen from './screens/DashboardScreen'
import SettingsScreen from './screens/SettingsScreen'
import NotiSettingsScreen from './screens/NotiSettingsScreen'
import LoginScreen from './screens/LoginScreen'

import _ from 'lodash'
import firebase from 'firebase'
import credentials from './credentials'

YellowBox.ignoreWarnings(['Setting a timer'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
}

firebase.initializeApp(credentials.firebase)

class IconWithBadge extends React.Component {
  render () {
    const { name, badgeCount, color, size } = this.props
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
        <View
          style={{
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
  return <IconWithBadge {...props} badgeCount={1} />
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state
  let IconComponent = Ionicons
  let iconName
  if (routeName === 'Welcome') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`
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
    iconName = 'ios-add'
  } else if (routeName === 'Notifications') {
    iconName = 'ios-switch'
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />
}

const WelcomeStack = createBottomTabNavigator({
  Welcome: { screen: WelcomeScreen },
  Auth: { screen: AuthScreen },
  Login: { screen: LoginScreen }
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  })

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Notifications: { screen: NotiSettingsScreen }
})

const DashboardStack = createBottomTabNavigator({
  Flow: {screen: GithubFlowScreen},
  Dashboard: { screen: DashboardScreen },
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
  })

const RootStack = createBottomTabNavigator(
  {
    Welcome: WelcomeStack,
    DashBoard: DashboardStack,
    Settings: SettingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: false,
      tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    lazy: true
  })
const AppContainer = createAppContainer(RootStack)

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
