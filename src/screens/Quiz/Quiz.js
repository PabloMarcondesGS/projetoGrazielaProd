import React, { useState, useEffect } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  ActivityIndicator,
  View,
  Dimensions,
  Alert,
  BackHandler,
  TouchableOpacity
} from 'react-native'
import { map } from 'lodash'
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H1,
  H2,
  H3,
  Left,
  Right,
  Icon,
  Button,
  Card,
  CardItem
} from 'native-base'

import { shuffle } from '../../utils'
import styles from './styles'

const { width } = Dimensions.get('window')

const letters = ['A', 'B', 'C', 'D', 'E', 'F']

const Home = ({ subject }) => {
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState()
  const [isSolved, setIsSolved] = useState(false)
  const [corrects, setCorrects] = useState(0)
  const [wrongs, setWrongs] = useState(0)

  const onChangeSubject = () => {
    if (subject) {
      const updatedQuestions = shuffle(map(subject.questions, x => x))
      setQuestions(updatedQuestions)
      setQuestion({ ...updatedQuestions[0], solved: false })
      setQuestionIndex(0)
      setCorrects(0)
      setWrongs(0)
      setAnswer()
      setIsSolved(false)
    }
  }

  const onSolveClick = () => {
    setIsSolved(true)

    if (answer.correct) {
      setCorrects(corrects + 1)
    } else {
      setWrongs(wrongs + 1)
    }
  }

  const nextQuestion = () => {
    const updatedQuestionIndex = questionIndex + 1
    const newQuestion = questions[updatedQuestionIndex]

    if (newQuestion) {
      setAnswer()
      setIsSolved(false)
      setQuestion(newQuestion)
      setQuestionIndex(updatedQuestionIndex)
    }
  }

  const onClose = () => {
    Alert.alert(
      'Deseja sair do quiz?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          onPress: () => {
            Actions.pop()
          }
        }
      ],
      { cancelable: false }
    )
    return true
  }

  const eventListener = () => {
    BackHandler.addEventListener('hardwareBackPress', onClose)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onClose)
    }
  }

  useEffect(onChangeSubject, [subject])
  useEffect(eventListener, [eventListener])

  return !question ? (
    <ActivityIndicator />
  ) : (
    <Container style={styles.background}>
      <Header style={styles.background}>
        <View style={{ flexDirection: 'row', width }}>
          <Button transparent onPress={onClose}>
            <Icon name="arrow-back" />
          </Button>
          <View style={{ flexDirection: 'column', width: width / 1.4 }}>
            <Title style={styles.letters}>{subject.name}</Title>
            <Title style={[styles.letters, { fontSize: 12 }]}>
              Questão {question.id}
            </Title>
          </View>
        </View>
      </Header>
      <Content>
        <View style={{ flexDirection: 'row' }}>
          <Left>
            <View style={styles.quantityQuestion}>
              <H1 style={styles.letters}>{questionIndex + 1}</H1>
              <H3
                style={{
                  marginTop: 'auto',
                  marginBottom: 0,
                  ...styles.letters
                }}>
                {` de ${questions.length}`}
              </H3>
            </View>
          </Left>
          <Right>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 12,
                marginRight: 12
              }}>
              <Text style={{ textAlign: 'right', ...styles.letters }}>
                Certas: {corrects}
              </Text>
              <Text style={{ textAlign: 'right', ...styles.letters }}>
                Erradas: {wrongs}
              </Text>
            </View>
          </Right>
        </View>
        <H3 style={[styles.description, styles.letters]}>
          {question.description}
        </H3>
        <Card style={[styles.background, styles.card]}>
          {question.options.map(option => (
            <CardItem
              key={option.order}
              style={[
                styles.cardItem,
                styles.background,
                option === answer && styles.cardItemSelected,
                option.correct && isSolved && styles.textCorrect,
                option === answer &&
                  isSolved &&
                  !option.correct &&
                  styles.textIncorrect
              ]}
              button
              disabled={isSolved}
              onPress={() => setAnswer(option)}>
              <Left>
                <Text
                  style={[
                    styles.letters,
                    option === answer && { color: '#000' },
                    option === answer && isSolved && styles.textOptionSelected
                  ]}>
                  {letters[option.order]}
                </Text>
                <Text
                  style={[
                    styles.letters,
                    option === answer && { color: '#000' },
                    option === answer && isSolved && styles.textOptionSelected
                  ]}>
                  {option.description}
                </Text>
              </Left>
            </CardItem>
          ))}
        </Card>
        {!isSolved ? (
          <View style={styles.viewButton}>
            <Button
              rounded
              style={styles.button}
              onPress={() => answer && onSolveClick()}>
              <Text style={[styles.text, styles.letters, { color: '#000' }]}>
                Resolver
              </Text>
            </Button>
          </View>
        ) : (
          <View style={styles.viewButton}>
            {question.explanation && (
              <View
                style={{
                  width,
                  margin: 10,
                  backgroundColor: '#232729',
                  paddingTop: 10,
                  borderRadius: 4,
                  justifyContent: 'center'
                }}>
                <H2 style={[styles.letters, { textAlign: 'center' }]}>
                  Comentário do professor
                </H2>
                <H3 style={[styles.explanation, { textAlign: 'center' }]}>
                  {question.explanation}
                </H3>
              </View>
            )}
            {questionIndex + 1 < questions.length && (
              <Button
                rounded
                onPress={nextQuestion}
                style={{ backgroundColor: '#e6c315', marginBottom: 20 }}>
                <Text style={[styles.letters, { color: '#000' }]}>Próxima</Text>
              </Button>
            )}
          </View>
        )}
        <TouchableOpacity
          style={styles.btnreport}
          onPress={() => Actions.Report({ quest: question.id })}>
          <Text style={{ color: '#BDC2C6' }}>Encontrou algum erro?</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  )
}

export default Home
