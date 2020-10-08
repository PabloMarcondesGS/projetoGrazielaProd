import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const ButtonStyled = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: grey;
  margin-top: 8px;
`

export const ButtonStyledPrevNext = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  background: grey;
  max-width: 40px;
  min-width: 40px;
  max-height: 40px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`

const styles = StyleSheet.create({
  typography: {
    marginVertical: 20,
    textAlign: 'center'
  },
  viewmenu: {
    flex: 1
  },
  config: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '70%',
    height: 250,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  containerText: {
    flexDirection: 'row',
    margin: 20,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#666',
    maxWidth: 120,
    minWidth: 120,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6c315',
  },
  icontext: {
    color: '#fff'
  },
  icontextTeacher: {
    color: '#fff',
    fontSize: 14
  },
  viewsocial: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    marginLeft: 100,
    marginRight: 100
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginBottom: 5
  }
})

export default styles
