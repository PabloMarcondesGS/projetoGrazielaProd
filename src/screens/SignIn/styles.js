import { StyleSheet } from 'react-native'

const defaultHorizontalMargin = 20

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 30,
    marginHorizontal: defaultHorizontalMargin,
    justifyContent: 'center',
    width: 330
  },
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 80,
    marginLeft: 84
  },
  form: {
    margin: 30,
    flex: 1,
    justifyContent: 'center'
  },
  signUp: {
    marginTop: defaultHorizontalMargin,
    marginHorizontal: defaultHorizontalMargin
  },
  forgotPassword: {
    marginHorizontal: defaultHorizontalMargin
  },
  textCenter: {
    textAlign: 'center'
  },
  formItem: {
    marginLeft: defaultHorizontalMargin,
    marginRight: defaultHorizontalMargin
  },
  loader: {
    marginTop: 60
  }
})

export default styles
