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

const Tips = ({ subjects, setIsAuth }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [tips, setTips] = useState()

  const onLoad = () => {
    database()
      .ref('/tips')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        var sorted = updatedSubjects.slice().sort(function(a, b) {
          return b.order + a.order
        })
        setTips(sorted)
      })
  }

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
            Dicas
          </Text>
        </Left>
      </Header>
      <View style={styles.containerText}>
        <View style={{ flex: 1 }}>
          <FlatListStyled
            data={tips}
            renderItem={({item}) => <Item colorText={colorText}
            back={back} item={item} />}
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
)(Tips)
