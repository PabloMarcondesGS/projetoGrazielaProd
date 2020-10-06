import React, { useState, useRef } from 'react'
import { auth } from 'firebase'
import { connect } from 'react-redux'
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Button, Text, View } from 'native-base'
import { Form } from '@unform/mobile'
import { getErrorMessage } from '../../utils'
import styles from './styles'
import { onIsAuth } from '../../store/actions/authorization'
import Input from '../../components/Input'

const background = { backgroundColor: '#353A3E' }
const color = { color: '#BDC2C6' }
const action = { backgroundColor: '#e6c315' }

const SignUp = ({ setIsAuth }) => {
  const formRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onRegister = async data => {
    try {
      setLoading(true)
      if (data.password !== data.confirm_password) {
        Alert.alert('Erro', 'As senhas estão incorretas')
        return
      }
      await auth().createUserWithEmailAndPassword(data.email, data.password)
      setIsAuth(true)
      Actions.Home()
    } catch ({ code }) {
      Alert.alert('Erro', getErrorMessage(code))
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  // const registerEnabled = password.trim() !== '' && password === confirmPassword

  return (
    <Container>
      <Form style={styles.form} onSubmit={onRegister} ref={formRef}>
        <Text
          style={{
            fontSize: 25,
            width: '100%',
            textAlign: 'center',
            marginBottom: 40
          }}>
          Criar uma conta
        </Text>
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
        <Input
          placeholder="Repita a senha"
          name="confirm_password"
          icon="lock"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <Button
            rounded
            primary
            style={[
              styles.signUp,
              action,
              {
                borderRadius: 10
              }
            ]}
            onPress={() => {
              formRef.current?.submitForm()
            }}>
            <Text style={{ color: '#000' }}>Cadastrar</Text>
          </Button>
        )}
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 45,
            marginRight: 40
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </Container>
  )
}

const mapStateToProps = ({ authorization }) => ({
  isAuth: authorization.isAuth
})

const mapDispatchToProps = dispatch => ({
  setIsAuth: value => dispatch(onIsAuth(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
