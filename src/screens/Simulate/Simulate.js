/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button } from 'native-base'
import { database } from 'firebase'
import { map } from 'lodash'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles, { FlatListStyled } from './styles'
import Item from './Item'
import Iconn from 'react-native-vector-icons/FontAwesome'

const Simulate = () => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [email, setEmail] = useState('')
  const [simulates, setSimulates] = useState([])

  const onLoad = () => {
    database()
      .ref('/simulates/subjects')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        setSimulates(updatedSubjects)
      })
  }

  useEffect(()=>{
    onLoad()
  },[])

  useEffect(() => {
    async function getData() {
      try {
        const emailAsync = await AsyncStorage.getItem(
          '@background:marcosmoraesemail'
        )
        if (emailAsync) {
          setEmail(emailAsync)
        } else {
          Actions.SignIn()
          return
        }
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

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Simulados
          </Text>
        </Left>
      </Header>
      <View style={styles.containerText}>
        <View style={{ flex: 1 }}>
          <FlatListStyled
            data={simulates}
            renderItem={({ item }) => (
              <Item
                item={item}
                email={email}
                colorText={colorText}
                back={back}
              />
            )}
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
  setIsAuth: isAuth => dispatch(onIsAuth(isAuth))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulate)
