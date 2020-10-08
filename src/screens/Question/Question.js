/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View } from 'react-native'
import Iconn from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button } from 'native-base'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles, { ButtonStyled, ButtonStyledPrevNext } from './styles'

import { shuffle } from '../../utils'
const Question = ({ subject, setSubjects, setIsAuth }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [questions, setQuestions] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [question, setQuestion] = useState({})
  const [corrects, setCorrects] = useState(0)
  const [wrongs, setWrongs] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)

  const onLoad = () => {
    database()
      .ref('/subjects')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        setSubjects(updatedSubjects)
      })
  }

  const onSolveClick = option => {
    setIsSolved(true)

    if (option.correct) {
      setCorrects(corrects + 1)
    } else {
      setWrongs(wrongs + 1)
    }
  }

  const nextQuestion = () => {
    const updatedQuestionIndex = questionIndex + 1
    const newQuestion = questions[updatedQuestionIndex]

    if (newQuestion) {
      setIsSolved(false)
      setQuestion(newQuestion)
      setQuestionIndex(updatedQuestionIndex)
    }
  }

  const prevQuestion = () => {
    const updatedQuestionIndex = questionIndex - 1
    const newQuestion = questions[updatedQuestionIndex]

    if (newQuestion) {
      setIsSolved(false)
      setQuestion(newQuestion)
      setQuestionIndex(updatedQuestionIndex)
    }
  }

  const returnColor = (option) => {
    if (isSolved && option.correct){
      return 'green'
    } else if (isSolved && !option.correct){
      return 'red'
    } else {
      return colorText
    }
  }

  useEffect(() => {
    const updatedQuestions = shuffle(map(subject.questions, x => x))
    // updatedQuestions.map(sub => console.log(sub))
    setQuestions(updatedQuestions)
    setQuestion({ ...updatedQuestions[0], solved: false })
    setQuestionIndex(0)
    setCorrects(0)
    setWrongs(0)
    setIsSolved(false)
  }, [subject])

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

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            {subject ? subject.name : ''}
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
                  flexWrap: 'wrap',
                }}>
                Questão {questionIndex + 1} de {questions.length}
              </Text>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap',
                }}>
                Certas: {corrects}, Erradas: {wrongs}
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
              {question ? (
                <View>
                  <Text
                    style={{
                      color: colorText,
                      textAlign: 'justify',
                      fontSize: 20,
                      flexWrap: 'wrap',
                    }}>
                    {question.description}
                  </Text>
                  <Text style={{marginTop: 24, fontSize: 13}}>Verde para a opção correta</Text>
                  {question.options && question.options.map(option => (
                    <ButtonStyled
                      onPress={() => onSolveClick(option)}
                      style={{backgroundColor: returnColor(option), color: 'white' }}
                      disabled={isSolved}
                    >
                      <Text
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        {option.description}
                      </Text>
                    </ButtonStyled>
                  ))}

                  {/* <ButtonStyled>
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        color: colorText,
                      }}>
                      ERRADO
                    </Text>
                  </ButtonStyled> */}
                  {isSolved ? (
                    <>
                    <Text style={{marginTop: 24, fontSize: 17}}>Explicação:</Text>
                    <ButtonStyled>
                      <Text
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          color: colorText,
                          flexWrap: 'wrap',
                        }}>
                        {question.explanation}
                      </Text>
                    </ButtonStyled>
                    </>
                  ) : (
                    <View />
                  )}

                  <View
                    style={{
                      marginTop: 36,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    {/* {questionIndex > 0 ? (
                      <ButtonStyledPrevNext onPress={prevQuestion}>
                        <Iconn name="arrow-left" color={colorText} size={17} />
                      </ButtonStyledPrevNext>
                    ) : (
                      <View />
                    )} */}
                    {questionIndex < questions.length - 1 ? (
                      <ButtonStyledPrevNext onPress={nextQuestion}>
                        <Iconn name="arrow-right" color={colorText} size={17} />
                      </ButtonStyledPrevNext>
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
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
)(Question)
