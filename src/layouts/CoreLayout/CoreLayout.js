import React, {
  PropTypes,
  Component
} from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import styles from '../../utils/styles'
import ReactSidebar from 'react-sidebar'

import './CoreLayout.scss'
import '../../styles/vendor/notie.scss'
import '../../styles/core.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  toggleSidebar,
  updateSidebar
} from '../../actions/sidebar'
import {
  setControls
} from '../../actions/control'

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar.get('data').toJS(),
    app: state.app.get('data').toJS(),
    controls: state.control.get('data').toJS(),
    customers: state.customer.toJS()
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      toggleSidebar,
      updateSidebar,
      setControls
    },
    dispatch
  )
})

class CoreLayout extends Component {
  constructor (props) {
    super(props)

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)

    this.state = {
      mql: null
    }
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    sidebar: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      toggleSidebar: PropTypes.func.isRequired,
      updateSidebar: PropTypes.func.isRequired,
      setControls: PropTypes.func.isRequired
    })
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onSetSidebarOpen (open) {
    this.props.actions.updateSidebar({ open })
  }

  componentWillMount () {
    var mql = window.matchMedia(`(min-width: 800px)`)
    mql.addListener(this.mediaQueryChanged)

    this.setState({
      mql: mql
    })
    // }, () => {
    //   if (user.id) {
    //     this.props.actions.updateSidebar({ docked: mql.matches })
    //   }
    // })
  }

  componentWillReceiveProps (nextProps) {
    // const {
    //   user: currentUser
    // } = this.props
    // const {
    //   user: nextUser
    // } = nextProps
    //
    // if (!currentUser.id && nextUser.id) {
    //   this.props.actions.updateSidebar({ docked: this.state.mql.matches })
    // }
  }

  componentWillUnmount () {
    const { mql } = this.state
    if (mql != null) {
      mql.removeListener(this.mediaQueryChanged)
    }
  }

  mediaQueryChanged () {
    // const { user } = this.props

    // if (user.id) {
    //   this.props.actions.updateSidebar({ docked: this.state.mql.matches })
    // }
  }

  render () {
    const {
      children,
      sidebar,
      user,
      app,
      location,
      actions,
      controls,
      customers
    } = this.props
    const {
      router
    } = this.context

    const sidebarContent = (
      <Sidebar user={user}
        app={app}
        controls={controls}
        customers={customers}
        router={router}
        pathname={location.pathname}
        docked={sidebar.docked}
        setControls={actions.setControls}
        toggleSidebar={actions.toggleSidebar} />
    )

    let bgColor = styles.color.loading
    if (location.pathname === '/') {
      bgColor = styles.color.white
    }

    const sidebarStyles = {
      sidebar: {
        zIndex: 200,
        borderRight: `1px solid ${styles.color.secondary}`,
        backgroundColor: 'white'
      },
      content: {
        backgroundColor: bgColor
      },
      overlay: {
        zIndex: 100
      }
    }

    return (
      <ReactSidebar sidebar={sidebarContent}
        styles={sidebarStyles}
        shadow={false}
        touch={false}
        touchHandleWidth={0}
        open={sidebar.open}
        docked={sidebar.docked}
        onSetOpen={this.onSetSidebarOpen}>
        <div className='flx h-100 overflow-x-hidden'>
          <Header location={location} />
          {children}
        </div>
      </ReactSidebar>
    )
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
