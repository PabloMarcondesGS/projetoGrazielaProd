import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import {
  SignIn,
  SignUp,
  ForgotPassword,
  Home,
  Quiz,
  Subcategory,
} from './screens'
import Init from './screens/Initial/Initial'
import Profile from './screens/Profile/Profile'
import Report from './screens/Report/Report'
import About from './screens/About'
import Legislation from './screens/Legislation'
import ComplementMaterial from './screens/ComplementMaterial'
import Questions from './screens/Questions'
import Simulate from './screens/Simulate'
import Gabarite from './screens/Gabarite'
import Ranking from './screens/Ranking'
import Question from './screens/Question'
import ResultSimulate from './screens/ResultSimulate'

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="SignIn" component={SignIn} hideNavBar initial />
      <Scene key="SignUp" component={SignUp} hideNavBar />
      <Scene key="Home" component={Home} hideNavBar />
      <Scene key="Init" component={Init} hideNavBar />
      <Scene key="Profile" component={Profile} hideNavBar />
      <Scene key="Quiz" component={Quiz} hideNavBar />
      <Scene key="Report" component={Report} hideNavBar />
      <Scene key="ForgotPassword" component={ForgotPassword} hideNavBar />
      <Scene key="About" component={About} hideNavBar />
      <Scene key="Legislation" component={Legislation} hideNavBar />
      <Scene
        key="ComplementMaterial"
        component={ComplementMaterial}
        hideNavBar
      />
      <Scene key="Subcategory" component={Subcategory} hideNavBar />
      <Scene key="Questions" component={Questions} hideNavBar />
      <Scene key="Simulate" component={Simulate} hideNavBar />
      <Scene key="Gabarite" component={Gabarite} hideNavBar />
      <Scene key="Ranking" component={Ranking} hideNavBar />
      <Scene key="Question" component={Question} hideNavBar />
      <Scene key="ResultSimulate" component={ResultSimulate} hideNavBar />
    </Stack>
  </Router>
)

export default Routes
