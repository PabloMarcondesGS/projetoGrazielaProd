import React, { useEffect, useState } from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import {
  SignIn,
  SignUp,
  ForgotPassword,
  Home,
  Quiz,
  Subcategory
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
import AsyncStorage from '@react-native-community/async-storage'
import ShowPdf from './screens/ShowPdf'
import Tips from './screens/Tips'

const Routes = () => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')

  useEffect(() => {
    async function getData() {
      try {
        const value = await AsyncStorage.getItem('@background:marcosmoraes')
        const valueText = await AsyncStorage.getItem(
          '@background:marcosmoraestext'
        )
        if (valueText) {
          setColorText(valueText)
        }
        if (value !== null) {
          setBack(value)
        }
      } catch (e) {
        // error reading value
      }
    }
    getData()
  }, [])
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="SignIn"
          component={SignIn}
          hideNavBar
          initial
          statusBarStyle="light-content"
        />
        <Scene
          key="SignUp"
          component={SignUp}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Home"
          component={Home}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Init"
          component={Init}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Profile"
          component={Profile}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Quiz"
          component={Quiz}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Report"
          component={Report}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="ForgotPassword"
          component={ForgotPassword}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="About"
          component={About}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Legislation"
          component={Legislation}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="ComplementMaterial"
          component={ComplementMaterial}
          hideNavBar
        />
        <Scene
          key="Subcategory"
          component={Subcategory}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Questions"
          component={Questions}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Simulate"
          component={Simulate}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Gabarite"
          component={Gabarite}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Ranking"
          component={Ranking}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Question"
          component={Question}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="ResultSimulate"
          component={ResultSimulate}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="ShowPdf"
          component={ShowPdf}
          hideNavBar
          statusBarStyle="light-content"
        />
        <Scene
          key="Tips"
          component={Tips}
          hideNavBar
          statusBarStyle="light-content"
        />
      </Stack>
    </Router>
  )
}
export default Routes
