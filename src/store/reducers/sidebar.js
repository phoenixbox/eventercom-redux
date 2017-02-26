import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'

const initialState = Immutable.fromJS({
  isLoading: false,
  error: false,
  data: {
    open: false,
    docked: false
  }
})

const internals = {
  /**
   * UPDATE_SIDEBAR_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_SIDEBAR_STORE]: (state, payload) => {
    return state.mergeDeep(Immutable.fromJS(payload))
  },
  /**
   * UPDATE_SIDEBAR
   *
   * @param {Object} payload - full machine data api
   * @api public
   */
  [C.UPDATE_SIDEBAR]: (state, payload) => {
    return state.mergeDeepIn(['data'], Immutable.fromJS(payload))
  },
  /**
   * TOGGLE_SIDEBAR
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.TOGGLE_SIDEBAR]: (state) => {
    const path = ['data', 'open']
    const open = state.getIn(path)

    return state.setIn(path, !open)
  }
}

const SidebarReducer = createReducer(initialState, internals)

module.exports.SidebarReducer = SidebarReducer
module.exports.internals = internals
