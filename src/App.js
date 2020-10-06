import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'firebase'
import { Provider } from 'react-redux'

import Routes from './routes'
import storeConfig from './store'

const { store, persistor } = storeConfig()

const App = () => {
  const onLoad = () => {
    !firebase.apps.length &&
      firebase.initializeApp({
        apiKey: 'AIzaSyB783gFQP4OIHO5O5mGuv6S50Rk9Uodkew',
        authDomain: 'marcos-moraes.firebaseapp.com',
        databaseURL: 'https://marcos-moraes.firebaseio.com',
        projectId: 'marcos-moraes',
        storageBucket: 'marcos-moraes.appspot.com',
        messagingSenderId: '329287441947',
        appId: '1:329287441947:web:aab841672143339920a2be',
        measurementId: 'G-51E3Z1LPZS',
      })
  }

  useEffect(onLoad, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
