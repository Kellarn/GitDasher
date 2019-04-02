import { ListItem } from 'react-native-elements'
import React, { Component } from 'react'
import { View, Text, Image, Switch } from 'react-native'

class NotiListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            githubInfo: props.githubInfo,
            isOn: false,
        }
    }
    updateRepo(value) {
        console.log(value)
    }
    render() {
        return (
            <ListItem
                title={this.props.githubInfo.repoName}
                switch={{
                    value: this.state.isOn,
                    onValueChange: value => this.updateRepo(value)
                }}
            />
        )
    }
}

// function mapStateToProps ({ githubInfo }) {
//   return {githubInfo: githubInfo}
// }

export default NotiListItem
