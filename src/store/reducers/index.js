import { combineReducers } from 'redux'

import authorization from './authorization'
import subjects from './subjects'

const combinedReducers = combineReducers({
  authorization,
  subjects,
})

export default combinedReducers
