import React, {
  PropTypes,
  Component
} from 'react'

import _ from 'lodash';
import classnames from 'classnames';

export default class ListControls extends Component {
  static propTypes = {
    sortBy: React.PropTypes.oneOf(['distance', 'name']),
    showAll: React.PropTypes.bool,
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    radius: React.PropTypes.number,
    setControls: React.PropTypes.func
  }

  setControls(payload) {
    const { setControls } = this.props
    return () => {
      setControls(payload)
    }
  }

  render() {
    const { showAll, sortBy, sortOrder } = this.props
    const baseClasses = 'app__button w-100 mt1 truncate'
    const allClasses = classnames({ [baseClasses]: true, 'active': showAll });
    const matchesClasses = classnames({ [baseClasses]: true, 'active': !showAll })

    const idButtonClasses = classnames({ [baseClasses]: true, 'active': sortBy === 'name' });
    const distanceClasses = classnames({ [baseClasses]: true, 'active': sortBy === 'distance' })

    const ascClasses = classnames({ [baseClasses]: true, 'active': sortOrder === 'asc' });
    const descClasses = classnames({ [baseClasses]: true, 'active': sortOrder === 'desc' })

    return (
      <div className="flx flx-row-ns w-100">
        <div className="w-100 w-33-ns pa1">
          <div className='f6 f5-ns fw5 truncate'>Customers within:</div>
          <div className="mt2-ns">
            <div className="ph1 w-50 w-100-ns fl">
              <button className={allClasses} onClick={this.setControls({showAll: true})}>All</button>
            </div>
            <div className="ph1 w-50 w-100-ns fl">
              <button className={matchesClasses} onClick={this.setControls({showAll: false})}>{`${this.props.radius}km`}</button>
            </div>
          </div>
        </div>
        <div className="w-100 w-33-ns pa1">
          <div className='f6 f5-ns fw5 truncate'>Sort by:</div>
          <div className="mt2-ns">
            <div className="ph1 w-50 w-100-ns fl">
              <button className={distanceClasses} onClick={this.setControls({sortBy: 'distance'})}>Distance</button>
            </div>
            <div className="ph1 w-50 w-100-ns fl">
              <button className={idButtonClasses} onClick={this.setControls({sortBy: 'name'})}>Name</button>
            </div>
          </div>
        </div>
        <div className="w-100 w-33-ns pa1">
          <div className='f6 f5-ns fw5 truncate'>Order by:</div>
          <div className="mt2-ns">
            <div className="ph1 w-50 w-100-ns fl">
              <button className={ascClasses} onClick={this.setControls({sortOrder: 'asc'})}>Asc</button>
            </div>
            <div className="ph1 w-50 w-100-ns fl">
              <button className={descClasses} onClick={this.setControls({sortOrder: 'desc'})}>Desc</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
