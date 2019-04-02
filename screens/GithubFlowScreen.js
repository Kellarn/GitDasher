import React, { Component } from 'react'
import {View, Text, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
// import * as actions from '../actions'
import { getCommits } from '../actions/org_repo_actions'
import equal from 'fast-deep-equal'
import { AppLoading } from 'expo';
import CardComponent from '../components/CardComponent'
// import reducers from '../reducers';

class GithubFlowScreen extends Component {
  state = {
    currentOrgUrl: '',
  }
  componentDidMount () {
    this.props.getCommits()
    // this.state.intervalId = setInterval(() => console.log(this.props.commits), 10000) 
    // let currentOrg = await AsyncStorage.getItem('currentOrg')
    // this.setState({currentOrgUrl: currentOrg})
    // console.log(currentOrg)
  }
  componentDidUpdate(prevProps) {
    if(!equal(this.commits, prevProps.commits)) 
    {
      this.render() //hello
    }
} 
  componentWillMount() {
    this.props.navigation.addListener('willBlur', () =>
      console.log('willBlur first')
    )
    this.props.navigation.addListener('didBlur', () =>
      console.log('didBlur first')
    )
    this.props.navigation.addListener('willFocus', () =>
      this.props.getCommits()
      // this.setState({currentOrgUrl: AsyncStorage.getItem('currentOrg')})
    )
    this.props.navigation.addListener('didFocus', () =>
      console.log('didFocus first')
    )
  }
  async shouldComponentUpdate () {
    // let currentOrg = await AsyncStorage.getItem('currentOrg') 
    // // his.setState({currentOrgUrl: currentOrg})
    // console.log(currentOrg) 
    // console.log(this.props.org)
  }
  render () {
    const {commits, loading} = this.props
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
          {commits.length ? commits.map((commit, i) => <CardComponent key={i} githubInfo={commit}></CardComponent>): <Text>No commits</Text>}
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

const mapStateToProps = ({orgRepo})  => {
  return {commits: orgRepo.orgRepoData,
  loading: orgRepo.loading}
}
const mapDispatchToProps = {
  getCommits,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(GithubFlowScreen)
