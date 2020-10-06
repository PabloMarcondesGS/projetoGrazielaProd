import React from 'react'
import { Text, View } from 'react-native'

import { ViewStyled } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Item = ({ item }) => {
  return (
    <ViewStyled>
      <Iconn
        name="comments"
        color={item.color}
        size={28}
        style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
      />
      <Text style={{ color: item.color, flexBasis: '68%', flexWrap: 'wrap' }}>
        {item.title}
      </Text>
      <Iconn
        name="chevron-right"
        color={item.color}
        size={15}
        style={{
          flexBasis: '8%',
        }}
      />
    </ViewStyled>
  )
}

export default Item
