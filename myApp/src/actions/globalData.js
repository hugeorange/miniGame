import { SETUSERINFO } from '../constants/globalData'

export const setUserInfo = (param) => {
  return {
    type: SETUSERINFO,
    payload: {
      ...param
    }
  }
}
