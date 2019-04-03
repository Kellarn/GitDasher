import React, { Component } from 'react'
import {View, Text, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native'
import NotiListItem from '../components/NotiListItem'
import { connect } from 'react-redux'
import { getMyRepos } from '../actions/notification_repo_action'
import { ListItem } from 'react-native-elements'


class NotiSettingsScreen extends Component { 
    static navigationOptions = {
        title: 'Settings'
    }
    state = {
      pullValue: false,
      releaseValue: false,
      issueValue: false,
    }
    componentDidMount() {
      this.props.getMyRepos()
    }
  render () {
    const {loading, adminRepos} = this.props
    console.log(loading, adminRepos)
    if(loading === true) {
      return (
        <View>
         <ActivityIndicator size="large"></ActivityIndicator>
      </View>
      )
    } else if(loading === false) {
      return ( 
        <ScrollView style={{flex: 1, marginTop: 40}}>
        <Text style={{fontSize: 30}}>Push notifications</Text>
        <Text>Select events for push:</Text>
        <ListItem
        title={"Issues"}
        switch={{
          value:  this.state.issueValue,
          onValueChange: value => this.setState({issueValue: value})
        }}
      />
      <ListItem
        title={"Release"}
        switch={{
          value:  this.state.releaseValue,
          onValueChange: value => this.setState({releaseValue: value})
        }}
      />
      <ListItem
        title={"Pull request"}
        switch={{
          value: this.state.pullValue,
          onValueChange: value => this.setState({pullValue: value})
        }}
      />
      <Text style={{marginTop: 10}}>Select your repos:</Text>
          {adminRepos.length ? adminRepos.map((adminRepos, i) => 
          <NotiListItem 
          key={i} 
          githubInfo={adminRepos} 
          pushEvents={{issue: this.state.issueValue, release: this.state.releaseValue, pull: this.state.pullValue }}
          >
          </NotiListItem>): <Text>No repos</Text>}
        </ScrollView>
      )
    } else {
      return (
        <View>
         <ActivityIndicator size="large"></ActivityIndicator>
      </View> 
      )
    }
  }
}

const mapStateToProps = ({adminRepos}) => {
  return {adminRepos: adminRepos.adminRepos,
  loading: adminRepos.loading}
}
const mapDispatchToProps = {
  getMyRepos,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NotiSettingsScreen)
