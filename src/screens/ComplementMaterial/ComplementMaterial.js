import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View } from 'react-native'
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
      title: 'Legislação',
      description: '',
      color: colorText,
      link: 'https://firebasestorage.googleapis.com/v0/b/marcos-moraes.appspot.com/o/legislacao.pdf?alt=media&token=8545e5a3-dc04-424e-b685-cb78a65541c3'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2332',
      title: 'Tabela de reumos',
      description: '',
      color: colorText,
      link: 'https://firebasestorage.googleapis.com/v0/b/marcos-moraes.appspot.com/o/pdf-tow.pdf?alt=media&token=e4b80e09-40ff-4e5c-95ed-aad633f4081a'
    },
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
          <Button transparent onPress={() => Actions.pop()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Material
          </Text>
        </Left>
      </Header>
      <View style={styles.containerText}>
        <View style={{ flex: 1 }}>
          <FlatListStyled
            colorText={colorText}
            color={colorText}
            data={DATA}
            renderItem={Item}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = ({ subjects }) => ({ subjects })

const mapDispatchToProps = dispatch => ({
  setSubjects: items => dispatch(onSubjects(items)),
  setIsAuth: isAuth => dispatch(onIsAuth(isAuth)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplementMaterial)
