// React
import React, {
  PropTypes,
  Component
} from 'react'
import {
  Link
} from 'react-router'
// Utils
import styles from '../../../../../utils/styles'
// Components
import {
  Loader,
  Map,
  ControlPanel
} from '../../../../../components'
import {
  setControls
} from '../../../../../actions/control'
import helpers from '../../../../../containers/helpers'
// Libs
import _ from 'lodash'
// Redux

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    app: state.app.get('data').toJS(),
    controls: state.control.get('data').toJS(),
    customers: state.customer.toJS()
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setControls
    },
    dispatch
  )
})

class Dashboard extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  dashboardContent () {
    const { customers, controls, actions } = this.props
    const { origin, showAll, sortBy, sortOrder, radius, zoomLevel } = controls

    let sortedCustomers = helpers.calculateDistanceAndOrderBy(
      customers.data,
      origin,
      sortBy,
      sortOrder,
      showAll
    )

    if (!showAll) {
      sortedCustomers = helpers.filterByRange(sortedCustomers, radius)
    }

    const baseProps = {
      customers: customers.data,
      sortedCustomers: sortedCustomers,
      origin,
      radius
    }

    const controlProps = Object.assign({},
      {
        showAll,
        sortOrder,
        sortBy,
        setControls: actions.setControls
      },
      baseProps
    )

    const mapProps = Object.assign({},
      { zoomLevel },
      baseProps
    )

    return (
      <div className='flx flx-row'>
        <div className='dn flx-ns flx1-ns'>
          <ControlPanel {...controlProps} />
        </div>
        <div className='flx1 flx2-ns'>
          <Map {...mapProps} />
        </div>
      </div>
    )
  }

  content () {
    const {
      app,
    } = this.props
    let content

    if (app.isLoading) {
      content = <Loader />
    } else {
      content = this.dashboardContent()
    }

    return content
  }

  render () {
    const { children } = this.props

    return (
      <div className='flx h-100'>
        {this.content()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
