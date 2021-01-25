import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { ViewStyled } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Item = ({ item }) => {
  return (
    <ViewStyled>
      <Iconn
        name="file"
        color={item.color}
        size={28}
        style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
      />
      <View style={{ flexDirection: 'column', flexBasis: '68%' }}>
        <Text
          style={{ color: item.color, flexBasis: '100%', flexWrap: 'wrap' }}>
          {item.title}
        </Text>
        <Text
          style={{ color: item.color, flexBasis: '100%', flexWrap: 'wrap' }}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity onPress={() => Actions.ShowPdf({ link: item.link })}>
        <Iconn
          name="chevron-right"
          color={item.color}
          size={22}
          style={{
            flexBasis: '8%'
          }}
        />
      </TouchableOpacity>
    </ViewStyled>
  )
}

export default Item
