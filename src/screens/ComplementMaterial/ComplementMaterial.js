import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, BackHandler, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button, Icon } from 'native-base'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles, { FlatListStyled } from './styles'
import Item from './Item'
import Iconn from 'react-native-vector-icons/FontAwesome'

const ComplementMaterial = ({ subjects, setSubjects, setIsAuth }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')

  const onLoad = () => {
    database()
      .ref('/subjects')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        setSubjects(updatedSubjects)
      })
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      description: 'Lei n° 12.132 de 04/12/2025',
      color: colorText,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      description: 'Lei n° 12.132 de 04/12/2025',
      color: colorText,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      description: 'Lei n° 12.132 de 04/12/2025',
      color: colorText,
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'First Item',
      description: 'Lei n° 12.132 de 04/12/2025',
      color: colorText,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
      title: 'Second Item',
      description: 'Lei n° 12.132 de 04/12/2025',
      color: colorText,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Third Item',
      description: 'Lei n° 12.132 de 04/12/2025',
      color: colorText,
    }
  ]

  useEffect(() => {
    async function getData() {
      try {
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
  }, [])

  useEffect(onLoad, [])

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Material
          </Text>
        </Left>
      </Header>
      <View style={styles.containerText}>
        <FlatListStyled
          colorText={colorText}
          color={colorText}
          data={DATA}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

const mapStateToProps = ({ subjects }) => ({ subjects })

const mapDispatchToProps = dispatch => ({
  setSubjects: items => dispatch(onSubjects(items)),
  setIsAuth: isAuth => dispatch(onIsAuth(isAuth))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplementMaterial)
