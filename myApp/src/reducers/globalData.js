import { SETUSERINFO } from '../constants/globalData'

const INITIAL_STATE = {
    userInfo: {}
};

export default function globalData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETUSERINFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
