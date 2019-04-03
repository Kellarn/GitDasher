import React, { Component} from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'

class CardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      githubInfo: props.githubInfo
    }
  }
  render () {
    return (
      <Card
        title={this.props.githubInfo.name}
        image={{ uri: this.props.githubInfo.url }}
         >
        <Text>Repo name: {this.props.githubInfo.repoName}</Text>
        <Text style={{ marginBottom: 10 }}>
          Commit: {this.props.githubInfo.message}
        </Text>
        <Text>Date: {this.props.githubInfo.date}</Text>
      </Card>
    )
  }
}

export default CardComponent
