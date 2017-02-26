import _ from 'lodash';

import React, {
  PropTypes,
  Component
} from 'react'
import {
  NavTabs,
  CustomerList,
  ListControls,
  RadiusSlider,
  EventList
} from '..'
import styles from '../../utils/styles'
import { Link } from 'react-router'

export default class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.updateActiveComponent = this.updateActiveComponent.bind(this)
    this.state = {
      activeComponent: 'events'
    }
  }

  static propTypes = {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number,
    }),
    radius: React.PropTypes.number,
    setControls: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.oneOf(['distance', 'name']),
    showAll: React.PropTypes.bool,
    sortOrder: React.PropTypes.oneOf(['asc', 'desc'])
  }

  eventsComp () {
    return <EventList />
  }

  customersComp () {
    return (
      <div className="flx flx3">
        <div className="flx1 bb b-hairline b--black-50 ph2 pv1">
          <RadiusSlider value={this.props.radius}
            setControls={this.props.setControls} />
          <ListControls sortOrder={this.props.sortOrder}
            sortBy={this.props.sortBy}
            setControls={this.props.setControls}
            radius={this.props.radius}
            showAll={this.props.showAll} />
        </div>
        <div className="flx3 overflow-y-scroll ph2">
          <CustomerList customers={this.props.customers}
            sortedCustomers={this.props.sortedCustomers}
            sortOrder={this.props.sortOrder}
            sortBy={this.props.sortBy}
            showAll={this.props.showAll}
            origin={this.props.origin}
            radius={this.props.radius} />
        </div>
      </div>
    )
  }

  updateActiveComponent(comp) {
    this.setState({activeComponent: comp})
  }

  render() {
    const { activeComponent } = this.state
    const navProps = {
      update: this.updateActiveComponent,
      tabs: ['events', 'customers'],
      activeTab: activeComponent
    }
    let content = this[`${activeComponent}Comp`]()

    return (
      <div className="flx h-100">
        <NavTabs {...navProps} />
        {content}
      </div>
    )
  }
}
