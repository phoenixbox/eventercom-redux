import React, {
  Component,
  PropTypes
} from 'react';

import moment from 'moment';
import classnames from 'classnames';
import _ from 'lodash'
import styles from '../../utils/styles'

export default class EventCard extends Component {
  static propTypes = {
    occasion: React.PropTypes.string,
    invited_count: React.PropTypes.number,
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    day: React.PropTypes.number,
    cancelled: React.PropTypes.bool
  }

  timestamp() {
    const {
      year,
      month,
      day
    } = this.props
    const time = {
      year,
      month,
      day
    }

    return moment().set(time).format('ll');
  }

  eventStatus() {
    if (this.props.cancelled) {
      return <div className="f6 f5-ns i mb1">cancelled</div>
    }
  }

  render() {
    const {
      occasion,
      invited_count,
      cancelled
    } = this.props
    const stripStyles = {
      width: '0.5rem'
    }
    stripStyles.backgroundColor = cancelled ? styles.color.danger : styles.color.primary

    return (
      <div className="flx flx-row h3 h4-ns b--hairline mt1 bg-white br2">
        <div style={stripStyles}></div>
        <div className="flx space-between pa2">
          <div className='flx items-start justify-start'>
            <div className="f4 f3-ns fw5">{occasion}</div>
            <div className="f6 f5-ns mt2">{`Invite Count: ${invited_count}`}</div>
          </div>
          <div className='flx items-end justify-end'>
            {this.eventStatus()}
            <div className="f6 f5-ns">{this.timestamp()}</div>
          </div>
        </div>
      </div>
    )
  }
}
