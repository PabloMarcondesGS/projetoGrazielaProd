import React from 'react'
import { Text, View } from 'react-native'

import { ViewStyled } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Item = ({ item, colorText, back }) => {
  return (
    <ViewStyled>
      <Iconn
        name="file"
        color={colorText}
        size={28}
        style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
      />
      <View style={{ flexDirection: 'column', flexBasis: '68%' }}>
        <Text
          style={{ color: colorText, flexBasis: '100%', flexWrap: 'wrap' }}>
          {item.descricao}
        </Text>
      </View>
      {/* <Iconn
        name="chevron-right"
        color={colorText}
        size={15}
        style={{
          flexBasis: '8%'
        }}
      /> */}
    </ViewStyled>
  )
}

export default Item
