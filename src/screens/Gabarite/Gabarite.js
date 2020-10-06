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
import styles from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Gabarite = ({ subjects, setSubjects, setIsAuth }) => {
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
      question: 1,
      id: 123123,
      isCorrect: true
    },
    {
      question: 2,
      id: 1231234,
      isCorrect: true
    },
    {
      question: 3,
      id: 1231233,
      isCorrect: true
    },
    {
      question: 4,
      id: 12312344,
      isCorrect: false
    },
    {
      question: 5,
      id: 123123466666,
      isCorrect: true
    }
  ]

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Gabarito
          </Text>
        </Left>
      </Header>
      <ScrollView>
        <View style={styles.containerText}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24
            }}>
            <Iconn
              name="file"
              color={colorText}
              size={28}
              style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
            />
            <View style={{ flexDirection: 'column', flexBasis: '68%' }}>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap',
                }}>
                Gabarito Simulado 01
              </Text>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap',
                }}>
                Concurso PM/CE - 38 questões
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
            }}>
            <ScrollView style={{ flex: 1 }}>
              {data && data.length ? (
                data.map(da => (
                  <View style={{ flexBasis: '33%', flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: colorText,
                        textAlign: 'justify',
                        fontSize: 13,
                      }}>
                      {`${da.question} - ${da.isCorrect ? 'CERTO' : 'ERRADA'}`}
                    </Text>
                  </View>
                ))
              ) : (
                <View />
              )}
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
  setIsAuth: isAuth => dispatch(onIsAuth(isAuth)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gabarite)
