import { assert } from 'chai'
import _ from 'lodash'
import helpers from '../../../../src/containers/helpers'
import moment from 'moment'
const CUSTOMER_SAMPLE = [
  {
    "latitude": "52.986375",
    "user_id": 12,
    "name": "Christina McArdle",
    "longitude": "-6.043701"
  },
  {
    "latitude": "51.92893",
    "user_id": 1,
    "name": "Alice Cahill",
    "longitude": "-10.27699"
  },
  {
    "latitude": "51.8856167",
    "user_id": 2,
    "name": "Ian McArdle",
    "longitude": "-10.4240951"
  },
  {
    "latitude": "52.3191841",
    "user_id": 3,
    "name": "Jack Enright",
    "longitude": "-8.5072391"
  }
]
const INTERCOM_HQ = {
  latitude: 53.339374,
  longitude: -6.257495
}

describe('app/containers/helpers', function () {
  describe('#calculateDistanceAndOrderBy', function () {
    it('returns an array of objects sorted by distance ', function () {
      let target = [
        {
          distance: 41.76,
          id: 12,
          name: "Christina McArdle"
        },
        {
          distance: 188.96,
          id: 3,
          name: "Jack Enright"
        },
        {
          distance: 313.26,
          id: 1,
          name: "Alice Cahill"
        },
        {
          distance: 324.38,
          id: 2,
          name: "Ian McArdle"
        }
      ]
      let result = helpers.calculateDistanceAndOrderBy(CUSTOMER_SAMPLE, INTERCOM_HQ, 'distance', 'asc');

      assert.deepEqual(result, target)
    });
  });
  describe('#filterByRange', function () {
    it('restricts the list to a provided range', function () {
      let CUSTOMER_INPUT = [
        {
          "distance": 41.76,
          "id": 12
        },
        {
          "distance": 188.96,
          "id": 3
        },
        {
          "distance": 313.26,
          "id": 1
        },
        {
          "distance": 324.38,
          "id": 2
        }
      ]

      let target = [
        {
          "distance": 41.76,
          "id": 12
        },
        {
          "distance": 188.96,
          "id": 3
        }
      ]
      let result = helpers.filterByRange(CUSTOMER_INPUT, 200);

      assert.deepEqual(result, target);
    });
  })
  describe('#routePresentInPath', function () {
    beforeEach(function() {
      this.root = 'a/users/1/profile'
    })
    it('is present', function() {
      const path = '/a/users/1/profile'
      const result = helpers.routePresentInPath(this.root, path)
      assert.isTrue(result)
    })
    it('is not present', function() {
      const path = '/a/users/1/accounts'
      const result = helpers.routePresentInPath(this.root, path)
      assert.isFalse(result)
    })
  })
})
