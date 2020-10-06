import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native'
import { Header, Body, Left, Right, Icon, Button } from 'native-base'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

const addItem = (item, id, user) => {
  firebase
    .database()
    .ref('/reports')
    .push({
      id: id,
      user: user,
      report: item,
    })
}

const AddItemScreen = ({ quest }) => {
  const [report, setReport] = useState('')
  const email = firebase.auth().currentUser && firebase.auth().currentUser.email

  const handleSubmit = () => {
    addItem(report, quest, email)
    Alert.alert('Mensagem enviada com sucesso')
  }

  return (
    <View style={{ backgroundColor: '#353A3E', flex: 1 }}>
      <Header style={{ backgroundColor: '#353A3E' }}>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <View>
        <Text style={styles.title}>Descreva o problema no campo abaixo:</Text>
        <TextInput
          style={styles.itemInput}
          multiline
          numberOfLines={10}
          value={report}
          onChangeText={text => setReport(text)}
        />
      </View>

      <View style={{ justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#e6c315"
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>REPORTAR ERRO</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#353A3E',
  },
  title: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  itemInput: {
    padding: 4,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#e6c315',
  },
})

export default AddItemScreen
