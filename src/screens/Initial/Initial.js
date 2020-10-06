import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert, BackHandler, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import {
  Container,
  Header,
  Body,
  Title,
  List,
  Content,
  ListItem,
  Text,
  H2,
  Left,
  Right,
  Icon,
  Button
} from 'native-base'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles from './styles'

const background = { backgroundColor: '#353A3E' }
const color = { color: '#BDC2C6' }

const Init = ({ subjects, setSubjects, setIsAuth }) => {
  const onLoad = () => {
    database()
      .ref('/subjects')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        setSubjects(updatedSubjects)
      })
  }

  const setListners = () => {
    const onBack = () => {
      Actions.Home()
      return true
    }

    BackHandler.addEventListener('hardwareBackPress', onBack)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack)
    }
  }

  const onClickSuject = subject => {
    if (subject.questions) {
      Actions.Quiz({ subject })
    } else {
      Actions.Subcategory({ subject })
    }
  }

  const onLogOutClick = () => {
    Alert.alert(
      'Deseja sair?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          onPress: () => {
            BackHandler.exitApp()
          }
        }
      ],
      { cancelable: false }
    )
  }

  useEffect(onLoad, [])
  useEffect(setListners, [onLogOutClick])

  return (
    <Container>
      <Header style={background}>
        <Left>
          <Button transparent onPress={() => Actions.Home()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <Content style={background}>
        <H2 style={[styles.typography, color]}>Escolha o assunto</H2>
        <List
          dataArray={subjects}
          renderRow={subject => (
            <ListItem
              key={subject.id}
              button={true}
              onPress={() => onClickSuject(subject)}>
              <Left>
                <Text style={color}>{subject.name}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  )
}

const mapStateToProps = ({ subjects }) => ({ subjects })

const mapDispatchToProps = dispatch => ({
  setSubjects: items => dispatch(onSubjects(items)),
  setIsAuth: isAuth => dispatch(onIsAuth(isAuth))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)
