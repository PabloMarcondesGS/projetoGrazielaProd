/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Alert, ActivityIndicator } from 'react-native'
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
const Question = ({ subject, setSubjects}) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [questions, setQuestions] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [question, setQuestion] = useState({})
  const [corrects, setCorrects] = useState(0)
  const [wrongs, setWrongs] = useState(0)
  const [correct, setCorrect] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const onSolveClick = useCallback(async option => {
    setLoading(true)
    setIsSolved(true)
    if (option.correct) {
      setCorrects(prev => prev + 1)
      setCorrect(true)
      setWrong(false)
    } else {
      setWrongs(prev => prev + 1)
      setWrong(true)
      setCorrect(false)
    }
    await AsyncStorage.setItem('@background:marcosmoraesquestionwrongs',
      wrongs.toString())
    await AsyncStorage.setItem('@background:marcosmoraesquestioncorrects',
      corrects.toString())
    setLoading(false)
  },[corrects, wrongs])

  const nextQuestion = useCallback(async () => {
    setLoading(true)
    const updatedQuestionIndex = questionIndex + 1
    const newQuestion = questions[updatedQuestionIndex]

    try {
      if (updatedQuestionIndex > 0) {
        await AsyncStorage.setItem(`@background:marcosmoraesquestionindex:${subject.name}`,
          updatedQuestionIndex.toString())
        await AsyncStorage.setItem(`@background:marcosmoraesquestionname:${subject.name}`,
          subject ? subject.name : '')
      }
    } catch (e) {
      // saving error
    }
    if (newQuestion) {
      setIsSolved(false)
      setQuestion(newQuestion)
      setQuestionIndex(updatedQuestionIndex)
    }
    setLoading(false)
  },[questionIndex, questions, subject])

  const returnColor = (option) => {
    if (isSolved && option.correct){
      return 'green'
    } else if (isSolved && !option.correct){
      return 'red'
    } else {
      return back
    }
  }

  const finishSimulate = useCallback(async () => {
    try {
      database()
        .ref('/simulate')
        .push({
          datetime: new Date(),
          simulate: subject.name,
          corrects,
          wrongs,
          total: questions.length,
          user: email,
        })
      Alert.alert('Simulado finalizado com sucesso')
      await AsyncStorage.removeItem(`@background:marcosmoraesquestionindex:${subject.name}`)
      await AsyncStorage.removeItem(`@background:marcosmoraesquestionname:${subject.name}`)

      Actions.ResultSimulate({subject, email})
    } catch (error){
      console.log(error)
    }
  }, [email, subject, questions, corrects, wrongs])

  useEffect(() => {
    async function getDataArr (){
      const updatedQuestions = shuffle(map(subject.questions, x => x))
      // updatedQuestions.map(sub => console.log(sub))
      setQuestions(updatedQuestions)
      try {
        const indexAsync = await AsyncStorage.getItem(
          `@background:marcosmoraesquestionindex:${subject.name}`
        )
        const questionName = await AsyncStorage.getItem(
          `@background:marcosmoraesquestionname:${subject.name}`
        )
        if (indexAsync && questionName === subject.name){
          setQuestionIndex(parseInt(indexAsync))
          setQuestion({ ...updatedQuestions[parseInt(indexAsync)], solved: false })
          const wrongsQuesitons = await AsyncStorage.getItem(
            '@background:marcosmoraesquestionwrongs'
          )
          const correctQuestions = await AsyncStorage.getItem(
            '@background:marcosmoraesquestioncorrects'
          )
          setWrongs(parseInt(wrongsQuesitons))
          setCorrects(parseInt(correctQuestions))
        } else {
          setQuestionIndex(0)
          setQuestion({ ...updatedQuestions[0], solved: false })
          setCorrects(0)
          setWrongs(0)
        }
      } catch (err){
        console.log(err)
      }
      setIsSolved(false)
    }
    getDataArr()
  }, [subject])

  useEffect(() => {
    async function getData() {
      try {
        const indexAsync = await AsyncStorage.getItem(
          `@background:marcosmoraesquestionindex:${subject.name}`
        )
        if (indexAsync){
          // eslint-disable-next-line radix
          setQuestionIndex(parseInt(indexAsync))
        }
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
      }
    }
    getData()
  }, [subject.name])

  // useEffect(onLoad, [])

  return loading ? (
    <View style={{ flex: 1, alignItems: 'center', color:colorText , justifyContent: 'center', backgroundColor: back }}>
      <ActivityIndicator  />
    </View>
  ) : (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.pop()}>
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
                  <Text style={{marginTop: 24, fontSize: 13, color: colorText}}>Verde para a opção correta</Text>

                  {question.options && question.options.map(option => (
                    <ButtonStyled
                      onPress={() => onSolveClick(option)}
                      style={{backgroundColor: returnColor(option), color: 'white',
                         borderWidth: 1, borderColor: '#e6c315' }}
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
                      {
                        wrong && (
                          <Text style={{marginTop: 24, fontSize: 17, color: 'red', width: '100%', textAlign: 'center'}}>Errou</Text>
                        )
                      }
                      {
                        correct && (
                          <Text style={{marginTop: 24, fontSize: 17, color: 'green', width: '100%', textAlign: 'center'}}>Acertou</Text>
                        )
                      }
                      <Text style={{fontSize: 17,color: colorText}}>Explicação:</Text>
                      {}
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
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                     {questionIndex > 0 ? (
                      <ButtonStyled onPress={finishSimulate}>
                        <Text
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            color: colorText,
                          }}>
                          FINALIZAR
                        </Text>
                      </ButtonStyled>
                     ) : <View />}
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
