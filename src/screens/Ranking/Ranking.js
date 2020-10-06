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

const Ranking = ({ subjects, setSubjects, setIsAuth }) => {
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
            Ranking
          </Text>
        </Left>
      </Header>
      <ScrollView>
        <View style={styles.containerText}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
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
                Ranking Simulado 01
              </Text>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap'
                }}>
                Concurso PM/CE - 38 questões
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%'
            }}>
            <ScrollView style={{ flex: 1 }}>
              {data && data.length ? (
                data.map(da => (
                  <View
                    style={{
                      flexBasis: '100%',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#e6c315',
                      marginTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      borderRadius: 10
                    }}>
                    <Text
                      style={{
                        color: colorText,
                        textAlign: 'justify',
                        fontSize: 17
                      }}>
                      {`${da.id} - ${da.name}`}
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
  setIsAuth: isAuth => dispatch(onIsAuth(isAuth))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ranking)
