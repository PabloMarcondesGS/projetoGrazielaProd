import React, { Component, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native'
import {
  Header,
  Body,
  Title,
  Left,
  Right,
  Icon,
  Button,
  Alert,
} from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: '#353A3E' }}>
          <Left>
            <Button transparent onPress={() => Actions.Home()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <ScrollView>
          <Image
            style={styles.avatar}
            source={require('../../img/profile.png')}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>PROF. MARCOS MORAES</Text>
              <Text style={styles.info}>
                Bacharelado em Segurança Pública.{' '}
              </Text>
              <Text style={styles.info}>Bacharelado em Direito. </Text>
              <Text style={styles.info}>
                Pós Graduação em Ciências Júridicas.{' '}
              </Text>
              <Text style={styles.info}>
                Professor da Disciplina de Legislação da PMCE desde o ano de
                2006.{' '}
              </Text>
              <Text style={styles.info}>
                Professor da AESP das disciplinas: Legislação, Constitucional e
                Administrativo.{' '}
              </Text>
              <Text style={styles.info}>
                Conteudista da Academia de Policia: Direito Disciplicar.{' '}
              </Text>
              <Text style={styles.info}>
                Atuou por 8 (oito) vezes no cargo de Juiz Militar.{' '}
              </Text>
              <Text style={styles.description}>
                Experiência processual na confecção de: sindicância,
                procedimento disciplicar, conselho de justificação, conselho de
                disciplina, processo administrativo disciplinar e inquérito
                policial militar.
              </Text>
            </View>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>PROF. THIAGO OLIVEIRA</Text>
              <Text style={styles.info}>- Segurança Pública FIC</Text>
              <Text style={styles.info}>- CFSD AESP</Text>
              <Text style={styles.info}>
                - PROFESSOR DE LEGISLAÇÃO DESDE 2014.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353A3E',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#e6c315',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 120,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 25,
    color: '#e6c315',
    fontWeight: '600',
    marginTop: 20,
  },
  info: {
    fontSize: 15,
    color: '#BDC2C6',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#BDC2C6',
    marginTop: 10,
    textAlign: 'center',
  },
})
