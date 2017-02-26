/**
 * App store - app and platform level information
 *
 * @param {String} version
 * @param {String} email
 * @api public
 */

import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'

const initialState = Immutable.fromJS({
  isLoading: false,
  note: null,
  data: {
    platform: 'web',
    version: '0.0.1'
  }
})

const internals = {
  /**
   * UPDATE_APP_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_APP_STORE]: (state, payload) => {
    return state.mergeDeep(Immutable.fromJS(payload))
  },
  /**
   * UPDATE_APP
   *
   * @param {Object} payload - full machine data api
   * @api public
   */
  [C.UPDATE_APP]: (state, payload) => {
    return state.mergeDeepIn(['data'], Immutable.fromJS(payload))
  },
  /**
  * RESET_APP_STORE_FORM
  *
  * @param {Object} payload
  *  @param {Bool} isLoading
  *  @param {Object} error
  * @api public
  */
  [C.RESET_APP_STORE_FORM]: (state) => {
    return state.setIn(['fields'], Immutable.fromJS(FORM_FIELDS))
  }
}

const AppReducer = createReducer(initialState, internals)

module.exports.AppReducer = AppReducer
module.exports.internals = internals
