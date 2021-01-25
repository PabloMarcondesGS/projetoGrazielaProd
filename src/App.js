import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar } from 'react-native'
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
        apiKey: 'AIzaSyBJT-LchTr1eDAHZmtp8IS6rBiPilsqgAo',
        authDomain: 'marcos-moraes-c3886.firebaseapp.com',
        databaseURL: 'https://marcos-moraes-c3886-default-rtdb.firebaseio.com',
        projectId: 'marcos-moraes-c3886',
        storageBucket: 'marcos-moraes-c3886.appspot.com',
        messagingSenderId: '721789755860',
        appId: '1:721789755860:web:afb52328cd3d8804fcb641',
        measurementId: 'G-JGSGP6D0JK',
      })
  }

  useEffect(onLoad, [])

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#353A3E'" barStyle={'light-content'} />
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
