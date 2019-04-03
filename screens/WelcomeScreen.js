import React, { Component } from 'react'
import WelcomeSlides from '../components/WelcomeSlides'

const SLIDE_DATA = [
  { text: 'Welcome to GitDasher', color: '#03A9F4' },
  { text: 'View and controll you github repos', color: '#009688' },
  { text: 'Choose what you want to see to personalize your experience', color: '#03A9F4' }
]

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth')
  }
  render () {
    return (
      <WelcomeSlides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    )
  }
}

export default WelcomeScreen
