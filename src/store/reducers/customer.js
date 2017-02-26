/**
 * Customer reducer
 *
 */

import C from '../../constants'
import Immutable from 'immutable'
import { createReducer } from '../../utils'
import helpers from './helpers'
import SeedCustomers from '../seeds/customers'

const initialState = Immutable.fromJS({
  isLoading: false,
  note: null,
  data: SeedCustomers,
})

const internals = {
  /**
   * UPDATE_CUSTOMER_STORE
   *
   * @param {Object} payload
   *  @param {Bool} isLoading
   *  @param {Object} error
   * @api public
   */
  [C.UPDATE_CUSTOMER_STORE]: (state, payload) => {
    return state.merge(Immutable.fromJS(payload))
  },
  /**
   * SET_CUSTOMERS
   *
   * @param {Object} payload - array of customers
   * @api public
   */
  [C.SET_CUSTOMERS]: (state, payload) => {
    return helpers.setIn(state, ['data'], 'id', payload)
  }
}

const CustomerReducer = createReducer(initialState, internals)

module.exports.CustomerReducer = CustomerReducer
module.exports.internals = internals
