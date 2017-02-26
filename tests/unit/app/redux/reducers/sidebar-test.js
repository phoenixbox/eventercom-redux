import Immutable from 'immutable'
import { assert } from 'chai'
import { internals as sidebar } from '../../../../../src/store/reducers/sidebar'

describe('reducers/sidebar', function () {
  describe('actions', () => {
    describe('UPDATE_SIDEBAR_STORE', () => {
      it('sets the \'loading\' state', () => {
        const state = Immutable.fromJS({
          isLoading: false,
          error: null,
          data: {}
        })

        const payload = {
          isLoading: true
        }
        const result = sidebar.UPDATE_SIDEBAR_STORE(state, payload).toJS()
        assert.isTrue(result.isLoading)
      })
      it('updates the \'error\' state of the store', () => {
        const state = Immutable.fromJS(
          {
            isLoading: false,
            error: new Error('an error'),
            data: []
          }
        )
        const payload = {
          error: null
        }
        const result = sidebar.UPDATE_SIDEBAR_STORE(state, payload).toJS()
        assert.isNull(result.error)
      })
    })
    describe('UPDATE_SIDEBAR', () => {
      it('updates the \'error\' state of the store', () => {
        const state = Immutable.fromJS(
          {
            isLoading: false,
            error: null,
            data: {
              open: false
            }
          }
        )
        const payload = {
          open: true
        }
        const target = {
          isLoading: false,
          error: null,
          data: {
            open: true
          }
        }
        const result = sidebar.UPDATE_SIDEBAR(state, payload).toJS()
        assert.deepEqual(result, target)
      })
    })
    describe('TOGGLE_SIDEBAR', () => {
      it('toggles the open state of the sidebar', () => {
        const state = Immutable.fromJS(
          {
            isLoading: false,
            error: null,
            data: {
              open: false
            }
          }
        )

        const target = {
          isLoading: false,
          error: null,
          data: {
            open: true
          }
        }
        const result = sidebar.TOGGLE_SIDEBAR(state).toJS()
        assert.deepEqual(result, target)
      })
    })
  })
})
