import { StyleSheet } from 'react-native'

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
    borderRadius: 20
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10
  },
  menubutton: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    flexWrap: 'wrap'
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
