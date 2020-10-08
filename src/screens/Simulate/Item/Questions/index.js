import React from 'react'
import { Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { ViewStyled, ButtonStyled, TextStyled } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Questions = ({ item }) => {
  return item ? (
    <ViewStyled>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Iconn
          name="file"
          color={item.color}
          size={28}
          style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
        />
        <View style={{ flexDirection: 'column', flexBasis: '85%' }}>
          {item.name ? (
            <Text
              style={{
                color: item.color,
                flexBasis: '100%',
                flexWrap: 'wrap'
              }}>
              {item.name ? item.name : ''}
            </Text>
          ) : (
            <View />
          )}
          {item.description && (
            <Text
              style={{
                color: item.color,
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
        <ButtonStyled onPress={() => Actions.Question({ subject: item })}>
          <Iconn
            name="edit"
            color={item.color}
            size={22}
            style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
          />
          <TextStyled style={{ color: item.color, marginTop: 5 }}>
            Resolver
          </TextStyled>
        </ButtonStyled>
        <ButtonStyled onPress={() => Actions.ResultSimulate()}>
          <Iconn
            name="spell-check"
            color={item.color}
            size={22}
            style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
          />
          <TextStyled style={{ color: item.color, marginTop: 5 }}>
            Resultado
          </TextStyled>
        </ButtonStyled>
        <ButtonStyled onPress={() => Actions.Ranking()}>
          <Iconn
            name="random"
            color={item.color}
            size={22}
            style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
          />
          <TextStyled style={{ color: item.color, marginTop: 5 }}>
            Ranking
          </TextStyled>
        </ButtonStyled>
        <ButtonStyled onPress={() => Actions.Gabarite()}>
          <Iconn
            name="question"
            color={item.color}
            size={22}
            style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
          />
          <TextStyled style={{ color: item.color, marginTop: 5 }}>
            Gabarito
          </TextStyled>
        </ButtonStyled>
      </View>
    </ViewStyled>
  ) : (
    <View />
  )
}

export default Questions
