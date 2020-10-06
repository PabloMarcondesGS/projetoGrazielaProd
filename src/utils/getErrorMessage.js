const getErrorMessage = code => {
  switch (code) {
    case 'auth/network-request-failed':
      return 'Verifique sua conexão com a internet'

    case 'auth/invalid-email':
      return 'E-mail inválido'

    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Usuário ou senha inválidos'

    case 'auth/email-already-in-use':
      return 'E-mail já cadastrado!'

    default:
      return ''
  }
}

export default getErrorMessage
