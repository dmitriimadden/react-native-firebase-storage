import React from 'react'
import { StatusBar, Router, Scene } from 'react-native-router-flux'

import Main from './Main.js'
import Auth from './Auth.js'

console.disableYellowBox = true

const getSceneStyle = (props, computedProps) => {
   const style = {
      backgroundColor: 'white'
   }
   return style
}




const Routes = (props) => (

   <Router >

      <Scene key="root" hideNavBar >

         <Scene key="Auth" component={Auth} title="Auth" direction="vertical" hideNavBar />


         <Scene key="Main" component={Main} title="gov Works" direction="vertical" />


      </Scene>
   </Router>
)
export default Routes
