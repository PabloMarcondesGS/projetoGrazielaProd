import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, BackHandler, ScrollView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Header, Left, Button } from 'native-base'
import { PieChart } from 'react-native-chart-kit'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles, { ButtonStyled, ButtonStyledPrevNext } from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const ResultSimulate = ({ subjects, setSubjects, setIsAuth }) => {
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

  const data = [
    {
      name: 'Erros',
      awnsers: 8,
      color: 'red',
      legendFontColor: colorText,
      legendFontSize: 12,
    },
    {
      name: 'Acertos',
      awnsers: 30,
      color: 'green',
      legendFontColor: colorText,
      legendFontSize: 12,
    },
  ]
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      <Header style={{ backgroundColor: back }}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Button transparent onPress={() => Actions.Home()}>
            <Iconn name="arrow-left" color={colorText} size={17} />
          </Button>
          <Text style={{ color: colorText, fontSize: 17, marginLeft: 10 }}>
            Resultado
          </Text>
        </Left>
      </Header>
      <ScrollView>
        <View style={styles.containerText}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
              padding: 20,
              borderWidth: 1,
              borderColor: '#e6c315',
              borderRadius: 10,
            }}>
            <Iconn
              name="random"
              color={colorText}
              size={28}
              style={{ marginRight: 15, marginLeft: 15, flexBasis: '15%' }}
            />
            <View style={{ flexDirection: 'column', flexBasis: '68%' }}>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap'
                }}>
                Resultado Simulado 01
              </Text>
              <Text
                style={{
                  color: colorText,
                  flexBasis: '100%',
                  flexWrap: 'wrap'
                }}>
                Concurso PM/CE - 38 questões
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              padding: 20,
              borderWidth: 1,
              borderColor: '#e6c315',
              borderRadius: 10,
            }}>
            <ScrollView style={{ flex: 1 }}>
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Simulado Concluído
              </Text>
              <PieChart
                data={data}
                width={Dimensions.get('window').width}
                height={200}
                chartConfig={chartConfig}
                accessor="awnsers"
                backgroundColor="transparent"
                absolute
              />
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Acertos: 30 questões
              </Text>
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Erros: 30 questões
              </Text>
              <Text
                style={{
                  color: colorText,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 17,
                  flexWrap: 'wrap',
                }}>
                Posição: 194° lugar
              </Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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
)(ResultSimulate)
