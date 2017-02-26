import C from '../constants'

export function toggleSidebar () {
  return (dispatch) => {
    dispatch({
      type: C.TOGGLE_SIDEBAR
    })
  }
}

export function updateSidebar (payload) {
  return (dispatch) => {
    dispatch({
      type: C.UPDATE_SIDEBAR,
      payload
    })
  }
}
