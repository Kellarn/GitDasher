import React, { Component } from 'react'
import {View, Text, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native'
import NotiListItem from '../components/NotiListItem'
import { connect } from 'react-redux'
import { getMyRepos } from '../actions/notification_repo_action'


class NotiSettingsScreen extends Component { 
    static navigationOptions = {
        title: 'Settings'
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
      // console.log('hello' + this.props.orgRepo.length)
    } else if(loading === false) {
      return ( 
        <ScrollView style={{flex: 1, marginTop: 40}}>
        <Text style={{fontSize: 30}}>Push notifications: </Text>
          {adminRepos.length ? adminRepos.map((adminRepos, i) => <NotiListItem key={i} githubInfo={adminRepos}></NotiListItem>): <Text>No repos</Text>}
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
