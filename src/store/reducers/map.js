/**
 * Customer reducer
 *
 */

import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'
import helpers from './helpers'

const initialState = Immutable.fromJS({
  isLoading: false,
  note: null,
  data: [],
})

const internals = {
  /**
   * UPDATE_MAP_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_MAP_STORE]: (state, payload) => {
    return state.merge(Immutable.fromJS(payload))
  },
  /**
   * SET_MAPS
   *
   * @param {Object} payload - array of customers
   * @api public
   */
  [C.SET_MAPS]: (state, payload) => {
    return helpers.setIn(state, ['data'], 'id', payload)
  },
  /**
  * UPDATE_MAP_STORE_FORM
  *
  * @param {Object} payload
  *  @param {Bool} isLoading
  *  @param {Object} error
  * @api public
  */
  [C.UPDATE_MAP_STORE_FORM]: (state, payload) => {
    return state.mergeDeepIn(['fields'], Immutable.fromJS(payload))
  },
  /**
  * RESET_MAP_STORE_FORM
  *
  * @param {Object} payload
  *  @param {Bool} isLoading
  *  @param {Object} error
  * @api public
  */
  [C.RESET_MAP_STORE_FORM]: (state) => {
    return state.setIn(['fields'], Immutable.fromJS(FORM_FIELDS))
  }
}

const MapReducer = createReducer(initialState, internals)

module.exports.MapReducer = MapReducer
module.exports.internals = internals
