import React, {
  Component,
  PropTypes
} from 'react'
import './Header.scss'
import {
  toggleSidebar
} from '../../actions/sidebar'
import styles from '../../utils/styles'
import helpers from '../../containers/helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import MenuIcon from 'react-icons/lib/io/android-menu'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      toggleSidebar
    },
    dispatch
  )
})

class Header extends Component {
  constructor (props) {
    super(props)
    this.brandNav = this.brandNav.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      toggleSidebar: PropTypes.func.isRequired
    }),
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  brandNav () {
    this.context.router.push('/')
  }

  render () {
    const { location } = this.props

    const dimension = 40
    let content
    const {
      primary,
      loading
    } = styles.color

    const pathname = location.pathname
    const menuButton = (
      <button className='pointer button--blank' onClick={this.props.actions.toggleSidebar}>
        <MenuIcon size={dimension} color={primary} />
      </button>
    )
    let navStyle = {}
    if (location.pathname !== '/') {
      navStyle = { backgroundColor: loading }
      content = (
        <nav className='dt w-100 border-box pa2 relative z-2' style={navStyle}>
          <div key='nav__brand' className='dtc v-mid mid-gray link w-30 pointer' title='Home'>
            <div className='flex'>
              <div className='nav__brand--logo' onClick={this.brandNav} />
            </div>
          </div>
          <div key='nav__menu' className='dtc v-mid w-75 tr dn-l'>
            {menuButton}
          </div>
        </nav>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
