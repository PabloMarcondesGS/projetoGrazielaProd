import * as types from '../types'

const onIsAuth = payload => ({
  type: types.IS_AUTH,
  payload,
})

export { onIsAuth }
