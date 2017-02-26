import React, {
  PropTypes,
  Component
} from 'react'
import _ from 'lodash'
import AppStyles from '../../utils/styles'
import helpers from '../../containers/helpers'
import {
  ControlPanel
} from '../../components'
import { Link } from 'react-router'
import UUID from 'uuid'
import ProgressButton from 'react-progress-button'

class Sidebar extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    app: PropTypes.object,
    controls: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired,
    style: PropTypes.object,
    toggleSidebar: PropTypes.func.isRequired,
    setControls: PropTypes.func.isRequired,
    logout: PropTypes.func,
    router: PropTypes.object
  }

  controlPanel () {
    const { customers, controls, setControls } = this.props
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
        setControls
      },
      baseProps
    )

    return (
      <ControlPanel {...controlProps} />
    )
  }

  render () {
    const { style } = this.props
    let compStyles = style ? { ...styles.sidebar, ...style } : styles.sidebar

    return (
      <div style={compStyles}>
        {this.controlPanel()}
      </div>
    )
  }
}

module.exports = Sidebar

const styles = {
  sidebar: {
    width: 290,
    height: '100%'
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: AppStyles.color.primary,
    textDecoration: 'none'
  },
  placeholderTitle: {
    fontWeight: 500,
    color: AppStyles.color.primary
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: AppStyles.color.primary
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white'
  },
  root: {
    fontWeight: 300
  },
  header: {
    backgroundColor: 'white',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em'
  }
}
