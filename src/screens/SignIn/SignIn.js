/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react'
import { auth } from 'firebase'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActivityIndicator, Alert, Dimensions, Image } from 'react-native'
import { Container, Button, Text, View } from 'native-base'
import { Form } from '@unform/mobile'
import { getErrorMessage } from '../../utils'
import { onIsAuth } from '../../store/actions/authorization'

import Input from '../../components/Input'
import styles from './styles'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'
const { width } = Dimensions.get('window')

const action = { backgroundColor: '#e6c315' }

// var config = {
//   apiKey: 'AIzaSyB783gFQP4OIHO5O5mGuv6S50Rk9Uodkew',
//   authDomain: 'marcos-moraes.firebaseapp.com',
//   databaseURL: 'https://marcos-moraes.firebaseio.com'
// }

const SignIn = ({ isAuth, setIsAuth }) => {
  const _fbAuth = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login Cancelado')
        } else {
          AccessToken.getCurrentAccessToken().then(
            accessTokenData => {
              const credential = firebase.auth.FacebookAuthProvider.credential(
                accessTokenData.accessToken
              )
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(
                  result => {
                    Actions.Home()
                  },
                  error => {
                    console.log(error)
                  }
                )
            },
            error => {
              console.log('Houve um erro' + error)
            }
          )
        }
      },
      function(error) {
        alert('Falha ao fazer login' + error)
      }
    )
  }

  const formRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async data => {
    try {
      setLoading(true)
      await auth().signInWithEmailAndPassword(data.email, data.password)
      setIsAuth(true)
      setEmail('')
      setPassword('')
      Actions.Home()
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error.code))
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  const onLoad = () => {
    isAuth && Actions.Home()
  }

  useEffect(onLoad, [])

  return isAuth ? (
    <ActivityIndicator />
  ) : (
    <Container style={[styles.container]}>
      <Image
        source={require('../../img/marcosmoraes.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <Form style={styles.form} onSubmit={handleSignIn} ref={formRef}>
        <Input
          placeholder="E-mail"
          name="email"
          icon="mail"
          keyboardType="email-address"
        />

        <Input
          placeholder="Senha"
          name="password"
          icon="lock"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <>
            <View style={{ alignItems: 'center' }}>
              <Button
                rounded
                primary
                style={[
                  styles.loginButton,
                  action,
                  {
                    borderRadius: 10,
                  },
                ]}
                onPress={() => {
                  formRef.current?.submitForm()
                }}>
                <Text style={{ color: '#000', textAlign: 'center', width }}>
                  Acessar
                </Text>
              </Button>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Button
                onPress={_fbAuth}
                style={{
                  alignItems: 'center',
                  width: 330,
                  borderRadius: 10,
                  justifyContent: 'center',
                  marginTop: 20
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="facebook" size={20} color="#fff" />
                  <Text style={{ color: '#fff', marginLeft: 5 }}>
                    ENTRAR COM FACEBOOK
                  </Text>
                </View>
              </Button>
            </View>

            <Button
              full
              transparent
              style={[styles.signUp]}
              onPress={() => Actions.SignUp()}>
              <Text style={[styles.textCenter, { color: '#000' }]}>
                Cadastre-se
              </Text>
            </Button>

            <Button
              full
              transparent
              style={styles.forgotPassword}
              onPress={() => Actions.ForgotPassword()}>
              <Text style={[styles.textCenter, { color: '#000' }]}>
                Esqueci minha senha
              </Text>
            </Button>
          </>
        )}
      </Form>
    </Container>
  )
}

const mapStateToProps = ({ authorization }) => ({
  isAuth: authorization.isAuth
})

const mapDispatchToProps = dispatch => ({
  setIsAuth: value => dispatch(onIsAuth(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
