import { SUBJECT } from '../types'

const initialState = []

const subjects = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBJECT:
      return payload
    default:
      return state
  }
}

export default subjects
