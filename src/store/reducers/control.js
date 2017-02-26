/**
 * Controls reducer
 *
 */

import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'
import helpers from './helpers'

const initialState = Immutable.fromJS({
  isLoading: false,
  note: null,
  data: {
    sortOrder: 'asc',
    sortBy: 'distance',
    showAll: true,
    origin: {
      latitude: 53.338484,
      longitude: -6.2564565
    },
    radius: 100,
    zoomLevel: 8
  }
})

const internals = {
  /**
   * UPDATE_CONTROL_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_CONTROL_STORE]: (state, payload) => {
    return state.merge(Immutable.fromJS(payload))
  },
  /**
   * SET_CONTROLS
   *
   * @param {Object} payload - array of customers
   * @api public
   */
  [C.SET_CONTROLS]: (state, payload) => {
    return state.mergeDeepIn(['data'], Immutable.fromJS(payload))
  },
  /**
  * UPDATE_CONTROL_STORE_FORM
  *
  * @param {Object} payload
  *  @param {Bool} isLoading
  *  @param {Object} error
  * @api public
  */
  [C.UPDATE_CONTROL_STORE_FORM]: (state, payload) => {
    return state.mergeDeepIn(['fields'], Immutable.fromJS(payload))
  },
  /**
  * RESET_CONTROL_STORE_FORM
  *
  * @param {Object} payload
  *  @param {Bool} isLoading
  *  @param {Object} error
  * @api public
  */
  [C.RESET_CONTROL_STORE_FORM]: (state) => {
    return state.setIn(['fields'], Immutable.fromJS(FORM_FIELDS))
  }
}

const ControlReducer = createReducer(initialState, internals)

module.exports.ControlReducer = ControlReducer
module.exports.internals = internals
