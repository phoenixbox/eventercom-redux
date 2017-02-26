import React, { Component, PropTypes } from 'react'
import helpers from '../../../containers/helpers'
import { Landing } from '../../../components'
import styles from '../../../utils/styles'
import './Home.scss'
import _ from 'lodash'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    app: state.app.get('data').toJS()
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
    },
    dispatch
  )
})

class Home extends Component {
  static propTypes = {
    app: PropTypes.object,
    location: PropTypes.object
  }

  static contextTypes = {
    route: PropTypes.object,
    router: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='flx ph2 home__landing'>
        <Landing />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
