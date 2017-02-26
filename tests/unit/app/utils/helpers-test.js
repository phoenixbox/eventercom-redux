import helpers from '../../../../src/utils/helpers'
import { assert } from 'chai'

describe('(Utils) helpers', () => {
  describe('notie error level from status code', function () {
    describe('error', function () {
      it('returns 3 for 400 range', () => {
        const result = helpers.notieErrorCodeFromStatus(400)
        assert.equal(result, 3)
      })
      it('returns 3 for 500 range', () => {
        const result = helpers.notieErrorCodeFromStatus(500)
        assert.equal(result, 3)
      })
    })
    describe('warning', function () {
      it('returns 2 for 300 range', () => {
        const result = helpers.notieErrorCodeFromStatus(300)
        assert.equal(result, 2)
      })
    })
    describe('success', function () {
      it('returns 1 for 200 range', () => {
        const result = helpers.notieErrorCodeFromStatus(200)
        assert.equal(result, 1)
      })
    })
    describe('info', function () {
      it('returns 4 by default', () => {
        const result = helpers.notieErrorCodeFromStatus()
        assert.equal(result, 4)
      })
      it('returns 4 for all other range', () => {
        const result = helpers.notieErrorCodeFromStatus(100)
        assert.equal(result, 4)
      })
    })
  })
})
