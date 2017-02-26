import C from '../constants'

export function setControls (payload) {
  return (dispatch) => {
    dispatch({
      type: C.SET_CONTROLS,
      payload
    })
  }
}
