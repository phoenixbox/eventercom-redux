import Immutable from 'immutable'
import { assert } from 'chai'
import { internals as app } from '../../../../../src/store/reducers/app'

describe('reducers/app', function () {
  describe('actions', () => {
    describe('UPDATE_APP', () => {
      it('sets the onboardings and permissions', () => {
        const state = Immutable.fromJS({
          data: {
            config: {
              onboardings: null,
              permissions: {
                camera: null,
                photo: null
              }
            }
          }
        })

        const payload = {
          config: {
            onboardings: [
              { id: 1 },
              { id: 2 }
            ],
            permissions: {
              camera: 'authorized',
              photo: 'authorized'
            }
          }
        }

        const result = app.UPDATE_APP(state, payload).toJS()
        const target = {
          data: {
            config: {
              onboardings: [
                { id: 1 },
                { id: 2 }
              ],
              permissions: {
                camera: 'authorized',
                photo: 'authorized'
              }
            }
          }
        }
        assert.deepEqual(result, target)
      })
      it('updates permissions', () => {
        const state = Immutable.fromJS({
          data: {
            config: {
              permissions: {
                camera: null,
                photo: null
              }
            }
          }
        })

        const payload = {
          config: {
            permissions: {
              camera: 'authorized'
            }
          }
        }

        const result = app.UPDATE_APP(state, payload).toJS()
        const target = {
          data: {
            config: {
              permissions: {
                camera: 'authorized',
                photo: null
              }
            }
          }
        }
        assert.deepEqual(result, target)
      })
    })
  })
})
