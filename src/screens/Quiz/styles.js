import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  letter: {
    fontWeight: 'bold',
  },
  cardItem: {
    borderColor: '#2f3337',
    borderWidth: 3,
    margin: 10,
    padding: 10,
  },
  cardItemSelected: {
    backgroundColor: '#e6c315',
  },
  description: {
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 20,
    textAlign: 'justify',
    textAlignVertical: 'center',
    fontSize: 16,
  },
  viewButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: 150,
    backgroundColor: '#e6c315',
  },
  text: {
    textAlign: 'center',
    width: '100%',
  },
  explanation: {
    textAlign: 'left',
    padding: 30,
    color: '#BDC2C6',
  },
  textOptionSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textCorrect: {
    backgroundColor: '#00995c',
  },
  textIncorrect: {
    backgroundColor: '#cc0000',
  },
  quantityQuestion: {
    marginTop: 12,
    marginLeft: 12,
    flexDirection: 'row',
  },
  background: {
    backgroundColor: '#353A3E',
  },
  letters: {
    color: '#BDC2C6',
  },
  card: {
    borderColor: 'transparent',
  },
  btnreport: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
