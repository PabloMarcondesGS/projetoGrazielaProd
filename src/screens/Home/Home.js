import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, BackHandler, Switch } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { database } from 'firebase'
import { map } from 'lodash'
import { View, Image, TouchableOpacity, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text } from 'native-base'

import { onSubjects } from '../../store/actions/subjects'
import { onIsAuth } from '../../store/actions/authorization'
import styles from './styles'
import Iconn from 'react-native-vector-icons/FontAwesome'

const background = { backgroundColor: '#353A3E' }
const color = { color: '#BDC2C6' }

const onBack = () => {
  Alert.alert(
    'Deseja sair?',
    '',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () => {
          Actions.SignIn()
        },
      },
    ],
    { cancelable: false }
  )

  return true
}

const IconImage = ({ source }) => (
  <Image source={source} style={styles.imageIcon} />
)

const Home = ({ subjects, setSubjects, setIsAuth }) => {
  const [back, setBack] = useState('#353A3E')
  const [colorText, setColorText] = useState('#353A3E')
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    storeData()
    Actions.Home()
  }
  const onLoad = () => {
    database()
      .ref('/subjects')
      .once('value', snapshot => {
        const updatedSubjects = map(snapshot.val(), x => x)
        setSubjects(updatedSubjects)
      })
  }
  const storeData = async () => {
    try {
      if (!isEnabled) {
        await AsyncStorage.setItem('@background:marcosmoraes', '#353A3E')
        await AsyncStorage.setItem('@background:marcosmoraestext', '#ffffff')
      } else {
        await AsyncStorage.setItem('@background:marcosmoraes', '#ffffff')
        await AsyncStorage.setItem('@background:marcosmoraestext', '#353A3E')
      }
    } catch (e) {
      // saving error
    }
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
          if (value === '#ffffff') {
            setIsEnabled(false)
          } else {
            setIsEnabled(true)
          }
        }
      } catch (e) {
        // error reading value
      }
    }
    getData()
  }, [])

  const setListners = () => {
    BackHandler.addEventListener('hardwareBackPress', onBack)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack)
    }
  }

  const onLogOutClick = () => {
    Alert.alert(
      'Deseja sair?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            setIsAuth(false)
            Actions.SignIn()
            // BackHandler.exitApp()
          },
        },
      ],
      { cancelable: false }
    )
  }

  const onClickProfile = () => {
    BackHandler.removeEventListener('hardwareBackPress', onBack)
    Actions.Profile()
  }

  useEffect(onLoad, [])
  useEffect(setListners, [onLogOutClick])

  return (
    <View style={{ ...styles.viewmenu, backgroundColor: back }}>
      {/* <Header style={background}>
        <Left />
        <Right>
          <Button transparent onPress={onLogOutClick}>
            <Icon name="exit" />
          </Button>
        </Right>
      </Header> */}
      <View style={styles.config}>
        <Image style={styles.image} source={require('../../img/profile.png')} />
        <Text style={styles.text}>Bem vindo(a)!</Text>
      </View>

      <View style={styles.menubutton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.Legislation()}>
          <Iconn name="copy" size={30} color="#FFFFFF" />
          <Text style={styles.icontext}>Legislação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.Questions()}>
          <Iconn name="comments" size={30} color="#FFFFFF" />
          <Text style={styles.icontext}>Questões</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button }}
          onPress={() => {
            Linking.openURL(
              'https://www.youtube.com/channel/UCD8LLEzUD1EAuHLtG6b_hdA'
            )
          }}>
          <Iconn name="play" size={30} color="#FFFFFF" />
          <Text style={styles.icontext}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, marginTop: 14 }}
          onPress={() => Actions.Simulate()}>
          <Iconn name="check" size={30} color="#FFFFFF" />
          <Text style={styles.icontextTeacher}>Simulados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, marginTop: 14 }}
          onPress={() => Actions.ComplementMaterial()}>
          <Iconn name="file" size={30} color="#FFFFFF" />
          <Text style={styles.icontext}>Material</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, marginTop: 14 }}
          onPress={() => {
            BackHandler.removeEventListener('hardwareBackPress', onBack)
            Actions.About()
          }}>
          <Iconn name="question" size={30} color="#FFFFFF" />
          <Text style={styles.icontext}>Sobre</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewsocial}>
        <TouchableOpacity
          style={styles.social}
          onPress={() => {
            Linking.openURL('https://www.instagram.com/professormarcosmoraes/')
          }}>
          <Iconn name="instagram" size={30} color="#C71585" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.social}
          onPress={() => {
            Linking.openURL('https://www.instagram.com/professormarcosmoraes/')
          }}>
          <Iconn name="youtube" size={30} color="#FF0000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.social}
          onPress={() => {
            Linking.openURL('https://www.instagram.com/professormarcosmoraes/')
          }}>
          <Iconn name="facebook" size={30} color="#4050b5" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.social}
          onPress={() => {
            Linking.openURL('https://api.whatsapp.com/send?phone=558597785424/')
          }}>
          <Iconn name="whatsapp" size={30} color="#006400" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.social}
          onPress={() => {
            Linking.openURL('https://www.instagram.com/professormarcosmoraes/')
          }}>
          <Iconn name="share-square" size={30} color="#666666" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 24,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{ color: colorText }}>Modo escuro: </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#e6c315' }}
          thumbColor={isEnabled ? '#e6c315' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
)(Home)
