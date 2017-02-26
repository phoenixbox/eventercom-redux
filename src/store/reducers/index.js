import C from '../../constants'
import { combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'
// App Reducers
import locationReducer from './location'
// Domain Reducers
import { AppReducer as app } from './app'
import { SidebarReducer as sidebar } from './sidebar'
import { CustomerReducer as customer } from './customer'
import { ControlReducer as control } from './control'
import { MapReducer as map } from './map'

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    // Domain Reducers
    app,
    control,
    customer,
    map,
    sidebar,
    // App Reducers
    location: locationReducer,
    ...asyncReducers
  })

  const resetStoreOnLogout = (state, action) => {
    return appReducer(state, action)
  }

  /* returns single function to pass to create store */
  return enableBatching(resetStoreOnLogout)
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
