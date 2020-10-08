import React from 'react'
import { Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Questions from './Questions'

import { ViewStyled, ButtonStyled, TextStyled, FlatListStyled } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Item = ({ item }) => {
  return (
    <ViewStyled>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', flexBasis: '100%' }}>
          <Text
            style={{
              color: item.color,
              flexBasis: '100%',
              flexWrap: 'wrap',
              textAlign: 'center',
              paddingTop: 20,
            }}>
            {item.name}
          </Text>
          {item.subcategory ? (
            <View style={{ flex: 1 }}>
              <FlatListStyled
                data={item.subcategory}
                renderItem={Questions}
                keyExtractor={item => (item ? item.name : null)}
              />
            </View>
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
      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
        }}>
        <ButtonStyled onPress={() => Actions.Question()}>
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
      </View> */}
    </ViewStyled>
  )
}

export default Item
