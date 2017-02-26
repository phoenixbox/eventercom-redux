import styles from '../../../utils/styles'

import React, {
  Component,
  PropTypes
} from 'react'

class App extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    const { children } = this.props

    return (
      <div className='flx'>
        {children}
      </div>
    )
  }
}

export default App
