import PinColors from './pin-colors.js';

module.exports = {
  buildGeoJson(customers, sortedCustomers, radius) {
    return customers.map((cust) => {
      let color = PinColors.outside;
      let sortedCust = sortedCustomers.find((scust) => {
        return scust.id === cust.user_id
      })

      if (sortedCust) {
        color = sortedCust.distance < radius ? PinColors.inside : PinColors.outside;
      }

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(cust.longitude), parseFloat(cust.latitude)]
        },
        properties: {
          title: cust.name,
          'marker-color': color
        }
      }
    })
  },
  kmRadius(rad) {
    return rad * 1000
  }
}
