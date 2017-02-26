import React, {
  Component,
  PropTypes
} from 'react'
import styles from '../../utils/styles'
const Halogen = require('halogen/PulseLoader')

export default class Loader extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }

  static defaultProps = {
    color: styles.color.water_blue,
    height: '10px'
  }

  render () {
    const {
      color,
      height
    } = this.props

    return (
      <div className='loader tc'>
        <Halogen color={this.props.color} size={height} margin='3px' />
      </div>
    )
  }
}
