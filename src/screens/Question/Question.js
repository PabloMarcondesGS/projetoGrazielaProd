import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, BackHandler, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button, Icon } from 'native-base'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles, { ButtonStyled, ButtonStyledPrevNext } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Question = ({ subjects, setSubjects, setIsAuth }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')

  const onLoad = () => {
    database()
      .ref('/subjects')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        setSubjects(updatedSubjects)
      })
  }

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

  useEffect(onLoad, [])

  const data = [
    {
      name: 'Rodrigo',
      id: 1
    },
    {
      name: 'Rodrigo',
      id: 2
    },
    {
      name: 'Rodrigo',
      id: 3
    },
    {
      name: 'Rodrigo',
      id: 4
    },
    {
      name: 'Rodrigo',
      id: 5
    },
  ]

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Simulado 01
          </Text>
        </Left>
      </Header>
      <ScrollView>
        <View style={styles.containerText}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
              padding: 20,
              borderWidth: 1,
              borderColor: '#e6c315',
              borderRadius: 10,
            }}>
            <Iconn
              name="random"
              color={colorText}
              size={28}
              style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
            />
            <View style={{ flexDirection: 'column', flexBasis: '68%' }}>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap'
                }}>
                Questão 01 de 38
              </Text>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap'
                }}>
                Certas: 0, Erradas: 0
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              padding: 20,
              borderWidth: 1,
              borderColor: '#e6c315',
              borderRadius: 10,
            }}>
            <ScrollView style={{ flex: 1 }}>
              <Text
                style={{
                  color: colorText,
                  textAlign: 'justify',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                {'Questão 01?'}
              </Text>
              <ButtonStyled>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: colorText,
                  }}>
                  CERTO
                </Text>
              </ButtonStyled>
              <ButtonStyled>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: colorText,
                  }}>
                  ERRADO
                </Text>
              </ButtonStyled>
              <ButtonStyled>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: colorText,
                    flexWrap: 'wrap',
                  }}>
                  Resposta comentada do professor
                </Text>
              </ButtonStyled>
              <View
                style={{
                  marginTop: 36,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                <ButtonStyledPrevNext>
                  <Iconn name="arrow-left" color={colorText} size={17} />
                </ButtonStyledPrevNext>
                <ButtonStyledPrevNext>
                  <Iconn name="arrow-right" color={colorText} size={17} />
                </ButtonStyledPrevNext>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
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
)(Question)
