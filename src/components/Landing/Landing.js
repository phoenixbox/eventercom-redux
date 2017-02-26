import React, {
  PropTypes,
  Component
} from 'react'
// import {} from '../../components'
import styles from '../../utils/styles'
import { Link } from 'react-router'

export default class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  render () {
    return (
      <div className='flx w-100 justify-center'>
        <div className='center w-50 hero__header--eventercom' />
        <Link className='app__button tc pointer mw5 fw5 center mt2 w-100' to='/a/dashboard'>Invite Guests</Link>
      </div>
    )
  }
}
