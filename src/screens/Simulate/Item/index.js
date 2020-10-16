/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react'
import { Text, View} from 'react-native'
import { Actions } from 'react-native-router-flux'

import { ViewStyled, ButtonStyled, TextStyled } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'

const Questions = ({ item, colorText, email }) => {
  const [isSolved, setIsSolved] = useState(false)
  const [isSolvedIndex, setIsSolvedIndex] = useState()
  useEffect(() => {
    async function getData(){
      if (item && item.name){
        const indexAsync = await AsyncStorage.getItem(
          `@background:marcosmoraesquestionfinished:${item.name}`
        )
        setIsSolvedIndex(indexAsync)
        setIsSolved(true)
      } else {
        setIsSolved(false)
      }
    }
    getData()
  }, [item])
  return item ? (
    <ViewStyled>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Iconn
          name="file"
          color={colorText}
          size={28}
          style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
        />
        <View style={{ flexDirection: 'column', flexBasis: '85%' }}>
          {item.name ? (
            <Text
              style={{
                color: colorText,
                flexBasis: '100%',
                flexWrap: 'wrap',
              }}>
              {item.name ? item.name : ''}
            </Text>
          ) : (
            <View />
          )}
          {item.description && (
            <Text
              style={{
                color: colorText,
                flexBasis: '100%',
                flexWrap: 'wrap',
              }}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
        }}>
        {!isSolvedIndex ? (
          <ButtonStyled
            onPress={() => Actions.Question({ subject: item, email, isQuestion: false })}>
            <Iconn
              name="edit"
              color={colorText}
              size={22}
              style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
            />
            <TextStyled style={{ color: colorText, marginTop: 5 }}>
              Resolver
            </TextStyled>
          </ButtonStyled>
        ) : <View />}
        {isSolved && isSolvedIndex ? (
          <ButtonStyled
            onPress={() => Actions.ResultSimulate({ subject: item, email, isQuestion: false })}>
            <Iconn
              name="spell-check"
              color={colorText}
              size={22}
              style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
            />
            <TextStyled style={{ color: colorText, marginTop: 5 }}>
              Resultado
            </TextStyled>
          </ButtonStyled>
        ) : <View />}
        <ButtonStyled onPress={() => Actions.Ranking({ subject: item, email })}>
          <Iconn
            name="random"
            color={colorText}
            size={22}
            style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
          />
          <TextStyled style={{ color: colorText, marginTop: 5 }}>
            Ranking
          </TextStyled>
        </ButtonStyled>
      </View>
    </ViewStyled>
  ) : (
    <View />
  )
}

export default Questions
