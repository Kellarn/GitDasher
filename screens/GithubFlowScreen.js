import React, { Component } from 'react'
import {View, Text, ActivityIndicator, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { getCommits } from '../actions/org_repo_actions'
import equal from 'fast-deep-equal'
import CardComponent from '../components/CardComponent'

class GithubFlowScreen extends Component {
  state = {
    currentOrgUrl: '',
  }
  componentDidMount () {
    this.props.getCommits()

  }
  componentDidUpdate(prevProps) {
    if(!equal(this.commits, prevProps.commits)) 
    {
      this.render() 
    }
} 
  componentWillMount() {
    this.props.navigation.addListener('willFocus', () =>
      this.props.getCommits()
    )
  }
  async shouldComponentUpdate () {
  }
  render () {
    const {commits, loading} = this.props
    if(loading === true) {
      return (
        <View style={{marginTop: 50}}>
         <ActivityIndicator size="large"></ActivityIndicator>
      </View>
      )
    } else if(loading === false) {
      return ( 
        <ScrollView style={{marginTop: 40}}>
          {commits.length ? commits.map((commit, i) => <CardComponent key={i} githubInfo={commit}></CardComponent>): <Text>No commits</Text>}
        </ScrollView>
      )
    } else {
      return (
        <View style={{marginTop: 50}}>
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
