import { CHANGESTATE, BASELIST } from '../constants/icon'

export const changeState = (param) => {
  return {
    type: CHANGESTATE,
    payload: {
      ...param
    }
  }
}

export function asyncChangeState (param) {
  return (dispatch, getState) => {
    dispatch({
        type: CHANGESTATE,
        payload: {
          ...param
        }
    })
    const state = getState()
    return Promise.resolve(state)
  }
}

export function baseList(param) {
  return (dispatch, getState) => {
    dispatch({
      type: BASELIST,
      payload: {
        ...param
      }
    })
    const state = getState()
    return Promise.resolve(state)
  }
}