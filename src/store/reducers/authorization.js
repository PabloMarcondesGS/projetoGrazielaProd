import * as types from '../types'

const initialState = {
  isAuth: false,
}

const authorization = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.IS_AUTH:
      return { ...state, isAuth: payload }
    default:
      return state
  }
}

export default authorization
