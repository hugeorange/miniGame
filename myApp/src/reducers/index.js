import { combineReducers } from 'redux'
import counter from './counter'
import icon from './icon'
import globalData from './globalData'

export default combineReducers({
  counter,
  icon,
  globalData
})
