import React from 'react'
import { Text, View } from 'react-native'
import Questions from './Questions'

import { ViewStyled, FlatListStyled } from './styles'

const Item = ({ item, email, colorText, back }) => {
  return (
    <ViewStyled>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', flexBasis: '100%' }}>
          <Text
            style={{
              color: colorText,
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
                renderItem={({ item }) => (
                  <Questions
                    item={item}
                    email={email}
                    colorText={colorText}
                    back={back}
                  />
                )}
                keyExtractor={item => (item ? item.name : null)}
              />
            </View>
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
      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
        }}>
        <ButtonStyled onPress={() => Actions.Question()}>
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
        <ButtonStyled onPress={() => Actions.ResultSimulate()}>
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
        <ButtonStyled onPress={() => Actions.Ranking()}>
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
        <ButtonStyled onPress={() => Actions.Gabarite()}>
          <Iconn
            name="question"
            color={colorText}
            size={22}
            style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
          />
          <TextStyled style={{ color: colorText, marginTop: 5 }}>
            Gabarito
          </TextStyled>
        </ButtonStyled>
      </View> */}
    </ViewStyled>
  )
}

export default Item
