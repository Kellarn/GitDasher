import { ListItem } from 'react-native-elements'
import React, { Component } from 'react'
import { View, Text, Image, Switch } from 'react-native'
import { SecureStore } from 'expo'
import { AsyncStorage } from 'react-native'

class NotiListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      githubInfo: props.githubInfo,
      pushEvents: props.pushEvents,
      isOn: false,
      currentHook: {}
    }
  }
  async componentDidMount() {
    const currentHook = await AsyncStorage.getItem(this.props.githubInfo.name)
    const currentHookParsed = JSON.parse(currentHook)
    this.setState({ currentHook: currentHookParsed })
    console.log(this.state.currentHook)
    let token = await SecureStore.getItemAsync('gh_token')
    if (currentHookParsed !== null) {
      const response = await fetch(currentHookParsed.pingUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      const returnItem = await response
      console.log(returnItem)
      if (returnItem.ok === true) {
        this.setState({ isOn: true })
      }
    }
  }
  async updateRepo(value) {
    this.setState({ isOn: value })
    console.log(value)
    let token = await SecureStore.getItemAsync('gh_token')
    if (value === false) {
      console.log(this.state.currentHook)
      const response = await fetch(this.state.currentHook.hookUrl, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      const returnItem = await response
      console.log(returnItem)
      await AsyncStorage.removeItem(this.props.githubInfo.name)
    } else {
      let eventsArray = []
      if(this.props.pushEvents.issue){
        eventsArray.push("issue_comment", "issues")
      }
      if(this.props.pushEvents.release){
        eventsArray.push("release")
      }
      if(this.props.pushEvents.pull){
        eventsArray.push("pull_request")
      }
      console.log(eventsArray)
      const json = {
        "name": "web",
        "active": true,
        "events": eventsArray,
        "config": {
          "url": "https://us-central1-gitdasher.cloudfunctions.net/pushNotifications",
          "content_type": "json"
        }
      }

      const response = await fetch(this.props.githubInfo.hooksUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(json)
      })
      const content = await response.json()
      console.log(content)
      this.setState({ currentHook: { pingUrl: content.ping_url, hookUrl: content.url } })
      await AsyncStorage.setItem(this.props.githubInfo.name, JSON.stringify({ pingUrl: content.ping_url, hookUrl: content.url }))
    }
  }
  render() {
    return (
      <ListItem
        title={this.props.githubInfo.name}
        switch={{
          value: this.state.isOn,
          onValueChange: value => this.updateRepo(value)
        }}
      />
    )
  }
}

export default NotiListItem
