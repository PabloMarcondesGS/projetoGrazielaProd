/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, BackHandler, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button } from 'native-base'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Ranking = ({ subject, setSubjects, setIsAuth }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState({})
  const [data, setData] = useState([])
  const [email, setEmail] = useState('')
  const [rankingData, setRankingData] = useState([])

  useEffect(() => {
    async function getData() {
      try {
        const emailAsync = await AsyncStorage.getItem(
          '@background:marcosmoraesemail'
        )
        if (emailAsync) {
          setEmail(emailAsync)
        }
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

  useEffect(() => {
    setLoading(true)
    database()
      .ref('/simulate')
      .once('value', snapshot => {
        if (email) {
          const updatedSubjects = map(snapshot.val(), x => x)

          const valuesRanking = updatedSubjects.filter(
            val => val.simulate === subject.name
          )
          const sortedArr = valuesRanking.sort(function(a, b) {
            if (a.corrects > b.corrects) {
              return -1
            }
            if (a.corrects < b.corrects) {
              return 1
            }
            return 0
          })
          setData(sortedArr)

          setQuestions(updatedSubjects)
          setQuestion(updatedSubjects[updatedSubjects.length - 1])
        }
      })
  }, [subject, email, setSubjects, colorText])

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
                Ranking {question && question.simulate}
              </Text>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap'
                }}>
                {question && question.total} questões
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
                data.map((da, index) => (
                  <View
                    style={{
                      flexBasis: '100%',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#e6c315',
                      marginTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      paddingRight: 10
                    }}>
                    <Text
                      style={{
                        color: da.user === email ? '#e6c315' : colorText,
                        textAlign: 'justify',
                        fontSize: 17,
                        flexWrap: 'wrap',
                        borderLeftWidth: da.user === email ? 1 : 0,
                        borderLeftColor:
                          da.user === email ? '#e6c315' : 'transparent',
                        paddingLeft: da.user === email ? 8 : 0,
                      }}>
                      {`${index + 1} - ${da.user} - Corretas: ${da.corrects}`}
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
