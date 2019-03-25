import React, { Component } from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'

class GithubFlowScreen extends Component {
  state = {
    currentOrgUrl: '',
  }
  async componentDidMount () {
    // this.props.getOrgRepos()
    // let currentOrg = await AsyncStorage.getItem('currentOrg')
    // this.setState({currentOrgUrl: currentOrg})
    // console.log(currentOrg)
  }
  componentWillMount() {
    this.props.navigation.addListener('willBlur', () =>
      console.log('willBlur first')
    );
    this.props.navigation.addListener('didBlur', () =>
      console.log('didBlur first')
    );
    this.props.navigation.addListener('willFocus', () =>
      this.props.getOrgRepos()
      // this.setState({currentOrgUrl: AsyncStorage.getItem('currentOrg')})
    );
    this.props.navigation.addListener('didFocus', () =>
      console.log('didFocus first')
    );
  }
  async shouldComponentUpdate () {
    // let currentOrg = await AsyncStorage.getItem('currentOrg') 
    // // his.setState({currentOrgUrl: currentOrg})
    // console.log(currentOrg) 
    // console.log(this.props.org)
  }
  render () {
    return (
      <View>
        <Text>GithubFlowScreen</Text>
        <Text>GithubFlowScreen</Text>
        <Text>GithubFlowScreen</Text>
        <Text>GithubFlowScreen</Text>
        <Text>GithubFlowScreen</Text>
      </View>
    )
  }
}

function mapStateToProps ({ org, orgRepo }) {
  return {org: org.orgData, orgRepo: orgRepo.orgRepoData}
}

export default connect(mapStateToProps, actions)(GithubFlowScreen)
