import React, {
  Component,
  PropTypes
} from 'react';
import classnames from 'classnames';
import styles from '../../utils/styles';
import _ from 'lodash'

export default class CustomerNode extends Component {
  static  propTypes = {
    index: React.PropTypes.number,
    name: React.PropTypes.string,
    user_id: React.PropTypes.number,
    latitude: React.PropTypes.string,
    longitude: React.PropTypes.string,
    distance: React.PropTypes.number,
    outsideRadius: React.PropTypes.bool
  }

  render() {
    const {
      index
    } = this.props
    let indexClasses = classnames({
      'index': true,
      'outside': this.props.outsideRadius
    })
    let lat = _.round(this.props.latitude, 4);
    let long = _.round(this.props.longitude, 4);
    let discStyles = {
      width: 40,
      height: 40
    }
    const {
      outside,
      inside
    } = styles.color.pins
    discStyles.backgroundColor = this.props.outsideRadius ? outside : inside

    const rowClasses = classnames({
      'flx flx-row': true,
      'mt2': index > 0
    })

    return (
      <div className="flx flx-row mt2 bg-white br2 b--hairline pa1 pa2-ns">
        <div className='flx flx-row items-center'>
          <div className='tc'>
            <div style={discStyles} className='flx br-100 justify-center white fw5'>{this.props.index+1}</div>
          </div>
          <div className='flx ml2 ml3-ns'>
            <div className="f6 i">{`ID: ${this.props.user_id}`}</div>
            <div className="fw5 f5 f4-ns truncate">{this.props.name}</div>
          </div>
        </div>
        <div>
          <div className="tr">
            <div className="i">
              <div className="f6">{`Lat: ${_.round(lat, 2)}`}</div>
              <div className="f6">{`Long: ${_.round(long, 2)}`}</div>
            </div>
          </div>
          <div className="fw5 f6 f5-ns tr mt2">{`${this.props.distance}km`}</div>
        </div>
      </div>
    )
  }
}
