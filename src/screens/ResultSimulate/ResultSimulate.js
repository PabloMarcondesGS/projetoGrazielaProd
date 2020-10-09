import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button } from 'native-base'
import { PieChart } from 'react-native-chart-kit'
import Iconn from 'react-native-vector-icons/FontAwesome'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles from './styles'
import { shuffle } from '../../utils'

const ResultSimulate = ({ subject, setSubjects }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState({})
  const [data, setData] = useState([])
  const [email, setEmail] = useState('')
  const [rankingData, setRankingData] = useState('')

  useEffect(() => {
    const updatedQuestions = shuffle(map(subject.questions, x => x))
    // updatedQuestions.map(sub => console.log(sub))
    setQuestions(updatedQuestions)
  }, [subject])

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const emailAsync = await AsyncStorage.getItem(
          '@background:marcosmoraesemail'
        )
        if (emailAsync) {
          setEmail(emailAsync)
        } else {
          Actions.SignIn()
          return
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
        setLoading(false)
      }
      setLoading(false)
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
          const values = updatedSubjects.filter(
            val => val.simulate === subject.name && val.user === email
          )

          const valuesRanking = updatedSubjects.filter(
            val => val.simulate === subject.name
          )
          var sorted = valuesRanking.slice().sort(function(a, b) {
            return b.corrects - a.corrects
          })
          var ranks = valuesRanking.map(function(v) {
            return sorted.indexOf(v) + 1
          })

          setQuestions(values)
          setQuestion(values[values.length - 1])
          setSubjects(values)

          if (values && values.length) {
            let max = values.reduce(function(a, b) {
              return Math.max(a.corrects, b.corrects)
            })
            if (!max || max.corrects) {
              max = max.corrects
            }
            const valueCorrect = updatedSubjects.find(
              val =>
                val.simulate === subject.name &&
                val.user === email &&
                val.corrects === max
            )
            // const indexrank = ranks.indexOf(1)
            const indexValue = valuesRanking.map(e => e.corrects).indexOf(max)
            setRankingData(ranks[indexValue])

            if (valueCorrect) {
              setData([
                {
                  name: 'Erros',
                  awnsers:
                    valueCorrect && valueCorrect.wrongs
                      ? valueCorrect.wrongs
                      : 0,
                  color: 'red',
                  legendFontColor: colorText,
                  legendFontSize: 12,
                },
                {
                  name: 'Acertos',
                  awnsers:
                    valueCorrect && valueCorrect.corrects
                      ? valueCorrect.corrects
                      : 0,
                  color: 'green',
                  legendFontColor: colorText,
                  legendFontSize: 12,
                },
              ])
            }
          }

          setLoading(false)
        }
      })
  }, [subject, email, setSubjects, colorText])

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }
  return loading ? (
    <ActivityIndicator style={styles.loader} />
  ) : question ? (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Resultado - {question.simulate}
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
                Resultado - {question.simulate} - {question.total} questões
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
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Simulado Concluído
              </Text>
              <PieChart
                data={data}
                width={Dimensions.get('window').width}
                height={200}
                chartConfig={chartConfig}
                accessor="awnsers"
                backgroundColor="transparent"
                absolute
              />
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Acertos: {question.corrects} questões
              </Text>
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Erros: {question.wrongs} questões
              </Text>
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Posição: {rankingData} lugar
              </Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Simulado ainda não realizado.
          </Text>
        </Left>
      </Header>
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
)(ResultSimulate)
