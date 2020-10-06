import React, { useState, useRef } from 'react'
import { auth } from 'firebase'
import { Actions } from 'react-native-router-flux'
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { Container, Button, Text, View } from 'native-base'
import { Form } from '@unform/mobile'
import Input from '../../components/Input'

import styles from './styles'

const background = { backgroundColor: '#353A3E' }
const color = { color: '#BDC2C6' }
const action = { backgroundColor: '#e6c315' }

const ForgotPassword = () => {
  const formRef = useRef(null)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async data => {
    setIsLoading(true)

    const showSuccess = () => {
      Alert.alert(
        'Sucesso!',
        'Enviamos os passos para recuperação de senha para seu e-mail.',
        [
          {
            text: 'Ok',
            onPress: () => Actions.pop()
          }
        ]
      )
    }

    auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        setIsLoading(false)
        showSuccess()
      })
      .catch(({ code }) => {
        setIsLoading(false)

        if (code === 'auth/network-request-failed') {
          Alert.alert('Erro', 'Verifique sua conexão com a internet.', [
            {
              text: 'Ok',
              onPress: () => {}
            }
          ])
        } else {
          showSuccess()
        }
      })
  }

  return (
    <Container>
      <Form style={styles.form} onSubmit={onClick} ref={formRef}>
        <Input
          placeholder="E-mail"
          name="email"
          icon="mail"
          keyboardType="email-address"
        />
        {isLoading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <Button
            rounded
            info
            primary
            style={[
              styles.signUp,
              action,
              {
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              formRef.current?.submitForm()
            }}>
            <Text style={{ color: '#000' }}>Recuperar</Text>
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

export default ForgotPassword
