import { combineReducers } from 'redux'
import { landingsReducer } from './landingsReducer'

export const rootReducer = combineReducers({
  landingsModule: landingsReducer,
})
