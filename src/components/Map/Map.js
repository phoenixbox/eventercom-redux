import React, {
  PropTypes,
  Component
} from 'react'
import styles from '../../utils/styles'
import MapHelpers from './helpers.js';

import _ from 'lodash';

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
  }

  static propTypes = {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    radius: React.PropTypes.number,
    zoom: React.PropTypes.number,
    origin: React.PropTypes.object
  }

  componentDidMount() {
    const {
      customers,
      sortedCustomers,
      radius,
      origin,
      zoomLevel
    } = this.props
    L.mapbox.accessToken = __MAPBOX_KEY__
    this.map = L.mapbox.map('map', 'mapbox.streets')
                       .setView([origin.latitude, origin.longitude], zoomLevel);
    this.customerLayer = L.mapbox.featureLayer().addTo(this.map);
    this.addMarker(origin.latitude, origin.longitude, styles.color.pins.intercom)
    this.addCircle();
    this.setCustomerPins(this.props.customers, this.props.sortedCustomers, this.props.radius)
  }

  setCustomerPins(customers, sortedCustomers, radius) {
    let geoJson = MapHelpers.buildGeoJson(customers, sortedCustomers, radius)
    this.customerLayer.setGeoJSON(geoJson);
  }

  componentWillReceiveProps(nextProps) {
    const {
      customers,
      sortedCustomers,
      radius
    } = this.props
    const {
      customers: nextCusts,
      sortedCustomers: nextSortedCustomers,
      radius: nextRadius
    } = nextProps

    if (radius !== nextRadius) {
      this.radiusCircle.setRadius(MapHelpers.kmRadius(nextRadius));
    }
    if (customers !== nextCusts || sortedCustomers !== nextSortedCustomers) {
      this.setCustomerPins(nextCusts, nextSortedCustomers, nextRadius);
    }
  }

  addCircle() {
    const {
      origin,
      radius
    } = this.props
    let circleOptions = {
      stroke: true,
      color: styles.color.pins.intercom,
      weight: 3,
      opacity: 1,
      fill: true,
      fillColor: styles.color.pins.intercom,
      fillOpacity: 0.5
    }
    const kmRadius = MapHelpers.kmRadius(radius)

    this.radiusCircle = L.circle([origin.latitude, origin.longitude],
      kmRadius,
      circleOptions
    ).addTo(this.map);
  }

  addMarker(lat, long, color) {
    let marker = L.marker([lat, long], {
        icon: L.mapbox.marker.icon({
          'marker-color': color
        }),
        draggable: false
    }).addTo(this.map);
  }

  render() {
    return (
      <div>
        <div id='map' className='absolute top-0 bottom-0 h-100 w-100 z-1'></div>
      </div>
    )
  }
}
