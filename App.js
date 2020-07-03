import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './components/Routes.js'

class reactGovWorks extends Component {
   
   render() {
      return (
         <Routes />
      )
   }
}
export default reactGovWorks
AppRegistry.registerComponent('reactGovWorks', () => reactGovWorks)