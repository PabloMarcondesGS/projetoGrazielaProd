import React, { useState, useEffect } from 'react'
import { Actions } from 'react-native-router-flux'
import { map } from 'lodash'
import {
  Container,
  Header,
  Body,
  List,
  Content,
  ListItem,
  Text,
  H2,
  Left,
  Right,
  Icon,
  Button,
} from 'native-base'

import styles from './styles'

const background = { backgroundColor: '#353A3E' }
const color = { color: '#BDC2C6' }

const SubCategory = ({ subject }) => {
  const [subcategories, setSubcategories] = useState([])

  const onClickSubcategory = subcategory => {
    Actions.Quiz({ subject: subcategory })
  }

  const onChangeSubject = () => {
    let updatedSubcategories = subject.subcategory
      .filter(x => x && x.questions)
      .map(x => ({ ...x, questions: map(x.questions, y => y) }))
    let options = []

    for (const item of updatedSubcategories) {
      if (item && item.questions && item.questions.length > 0) {
        options = options.concat(item.questions)
      }
    }

    if (options.length > 0) {
      const allOptions = {
        id: 'all',
        name: 'TODOS',
        questions: options
      }

      updatedSubcategories = [allOptions].concat(updatedSubcategories)
    }

    setSubcategories(updatedSubcategories)
  }

  useEffect(onChangeSubject, [subject])

  return (
    <Container>
      <Header style={background}>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <Content style={background}>
        <H2 style={[styles.typography, color]}>Escolha a subcategoria</H2>
        <List
          dataArray={subcategories}
          renderRow={subcategory => (
            <ListItem
              key={subcategory.id}
              button={true}
              onPress={() => onClickSubcategory(subcategory)}>
              <Left>
                <Text style={color}>{subcategory.name}</Text>
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

export default SubCategory
