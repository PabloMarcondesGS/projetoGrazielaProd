import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  typography: {
    marginVertical: 20,
    textAlign: 'center',
  },
  viewmenu: {
    flex: 1,
  },
  config: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: 250,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
  containerText: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    borderColor: '#e6c315'
  },
  icontext: {
    color: '#fff',
  },
  icontextTeacher: {
    color: '#fff',
    fontSize: 14,
  },
  viewsocial: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    marginLeft: 100,
    marginRight: 100,
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
})

export default styles
