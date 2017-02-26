import React, {
  Component,
  PropTypes
} from 'react';
import helpers from '../../containers/helpers.js';
import {
  CustomerNode
} from '..'

export default class CustomerList extends Component {
  static propTypes = {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    sortBy: React.PropTypes.oneOf(['distance', 'name']),
    showAll: React.PropTypes.bool,
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number
    }),
    radius: React.PropTypes.number
  }

  customerNodes() {
    const {
      sortedCustomers, customers, radius, showAll, sortBy, sortOrder
    } = this.props

    return sortedCustomers.map((sortedCust, i) => {
      let customer = customers.find((cust) => cust.user_id === sortedCust.id)
      let outsideRadius = sortedCust.distance > this.props.radius;

      return (
        <li key={i}>
          <CustomerNode index={i}
                        {...customer}
                     distance={sortedCust.distance}
                 outsideRadius={outsideRadius} />
        </li>
      )
    })
  }

  render() {
    return (
      <div className="customer-list">
        <ul className="list pa0 mt1">
          {this.customerNodes()}
        </ul>
      </div>
    )
  }
}
