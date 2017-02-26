// Libs
import _ from 'lodash'
import Geo from '../utils/geo'

if (process.env.NODE_ENV === 'test') {
  global.__IG_CLIENT_ID__ = 'IG_CLIENT_ID'
  global.__CLIENT_ROOT__ = 'CLIENT_ROOT'
}

var helpers = {
  routePresentInPath(root, path) {
    const re = new RegExp(`^${path}`)
    return re.test(`/${root}`)
  },
  calculateDistanceAndOrderBy(customers, origin, sortBy, order) {
    return _.chain(customers)
      .map((customer) => {
        let custLocation = {
          latitude: customer.latitude,
          longitude: customer.longitude
        }

        return {
          id: customer.user_id,
          name: customer.name,
          distance: Geo.calculateDistance(custLocation, origin)
        }
      })
      .orderBy([sortBy], [order])
      .value()
  },
  filterByRange(customers, range) {
    return customers.filter((customer) => {
      return customer.distance <= range
    })
  }
}

module.exports = helpers
