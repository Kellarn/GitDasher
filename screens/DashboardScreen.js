import React, { Component } from 'react'
import {View, Text, Button , StyleSheet, Image, ActivityIndicator, Picker, Item, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import firebase from 'firebase'
import credentials from '../credentials'
import { SecureStore, Permissions, Notifications } from 'expo';
import { bindActionCreators } from 'redux';
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

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      firebase
        .database()
        .ref('users/' + this.currentUser.uid + '/push_token') 
        .set(token);
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    // this.setState({org:{name: 'Pick an org', imgUrl: ' '}})
    this.currentUser = await firebase.auth().currentUser
    console.log(this.currentUser)
    if(this.currentUser) {
      this.setState({ isSignedIn: true })
      await this.registerForPushNotificationsAsync();
      await this.props.dispatchOrgData() 
    }
  }
  // async shouldComponentUpdate() {
  //   let currentOrg = this.state.org || {}
  //   console.log(currentOrg)
  //   try {
  //     await AsyncStorage.setItem('currentOrg', currentOrg.name) 
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  onValueChange = value => {
    // console.log(this.state.org)
    // console.log(value)
    if(value) {
      this.setState({org: value})
      // this.props.add(this.state.org)
      // this.props.updateCurrentOrg(value)
    }
  }
  render () {
    if (this.state.isSignedIn) {
      // const user = firebase.auth().currentUser || {}
      // const data = this.props.dispatchRepoData()
      // // this.setState({user: user})
      // console.log(this.props.repo)
      // console.log(this.props.repo)
      if(this.props.org) {
        // console.log(this.props.repo)
        return (
          <View>
          <Picker
          mode="dropdown"
          placeholder="Pick an organization"
          selectedValue={this.state.org.name}
          onValueChange={this.onValueChange}
           >
          {/* <Picker.item label={"Pick an org"} value={{"imgUrl": ""}} key={"1"} /> */}
           {this.props.org.map((item)=> {
             return (<Picker.Item label={item.name} value={item} key={item.name}/>)
           })}
         </Picker>
         <Text style={styles.text}>{this.state.org.name}</Text>
         <Image source={{ uri: this.state.org.imgUrl }} style={styles.image} /> 
          </View>
        )
      }

    return (
      <View>
        <Image source={{ uri: this.currentUser.photoURL }} style={styles.image} />
        <Text>Welcome { this.currentUser.displayName } </Text>
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
