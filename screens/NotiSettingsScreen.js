import React, { Component } from 'react'
import {View, Text, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native'
import firebase from 'firebase'
import NotiListItem from '../components/NotiListItem'
import { connect } from 'react-redux'
import { getMyRepos } from '../actions/notification_repo_action'

class NotiSettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings'
    }
  render () {
    const {loading, allMyRepos} = this.props
    console.log(loading, commits)
    if(loading === true) {
      return (
        <View>
         <ActivityIndicator size="large"></ActivityIndicator>
      </View>
      )
      // console.log('hello' + this.props.orgRepo.length)
    } else if(loading === false) {
      return ( 
        <ScrollView style={{marginTop: 40}}>
          {allMyRepos.length ? allMyRepos.map((allMyRepos, i) => <NotiListItem key={i} githubInfo={allMyRepos}></NotiListItem>): <Text>No commits</Text>}
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

const mapStateToProps = ({adminRepos})  => {
  return {adminRepos: adminRepos.adminRepos,
  loading: adminRepos.loading}
}
const mapDispatchToProps = {
  getMyRepos,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(GithubFlowScreen)
