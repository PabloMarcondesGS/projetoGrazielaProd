import { StyleSheet } from 'react-native'

const defaultHorizontalMargin = 20

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 60,
    marginHorizontal: defaultHorizontalMargin
  },
  container: {
    flex: 1
  },
  form: {
    margin: 30,
    flex: 1,
    justifyContent: 'center'
  },
  signUp: {
    marginTop: defaultHorizontalMargin,
    marginHorizontal: defaultHorizontalMargin,
    justifyContent: 'center'
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
