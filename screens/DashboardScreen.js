import React, { Component } from 'react'
import {View, Text, StyleSheet, Image, ActivityIndicator, Picker, Item, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'
import { Permissions, Notifications } from 'expo';
import { updateCurrentOrg } from '../actions/current_org_action';


class DashboardScreen extends Component {
  state = { 
    isSignedIn: false,
    user: {}, 
    org: {}
  }
  componentWillMount() {
    this.props.navigation.addListener('willBlur', () =>
      AsyncStorage.setItem('currentOrg', this.state.org.url) 
    );
    this.props.navigation.addListener('didFocus', () =>
      console.log('didFocus first')
    );
  }
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();

      var updates = {}
      updates['/push_token'] = token

      firebase
        .database()
        .ref('/users/' + this.currentUser.uid).update(updates)
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.currentUser = await firebase.auth().currentUser
    console.log(this.currentUser)
    if(this.currentUser) {
      this.setState({ isSignedIn: true })
      await this.registerForPushNotificationsAsync();
      await this.props.dispatchOrgData() 
    }
  }
  onValueChange = value => {
    if(value) {
      this.setState({org: value})
    }
  }
  render () {
    if (this.state.isSignedIn) {
 
      if(this.props.org) {
        return (
          <View style={styles.container}>
            <Image source={{ uri: this.currentUser.photoURL }} style={styles.image} />
            <Text>Welcome {this.currentUser.displayName} </Text>
            <Picker
              mode="dropdown"
              style={{minWidth: 200}}
              placeholder="Pick an organization"
              selectedValue={this.state.org.name}
              onValueChange={this.onValueChange}
            >
              {this.props.org.map((item) => {
                return (<Picker.Item label={item.name} value={item} key={item.name} />)
              })}
            </Picker>
            <Text style={styles.text}>{this.state.org.name}</Text>
            <Image source={{ uri: this.state.org.imgUrl }} style={styles.image} />
          </View>
        )
      }

    return (
      <View style={{marginTop: 50}}>
         <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    )
    }
    return (
      <View>
         <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    )
  }
}


const mapStateToProps = ({ org }) =>  {
  return { org: org.orgData}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
},
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
 }
})
export default connect(mapStateToProps, actions)(DashboardScreen)
