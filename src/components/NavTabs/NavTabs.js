import React, {
  Component,
  PropTypes
} from 'react'
import styles from '../../utils/styles'
import helpers from '../../containers/helpers'
import classnames from 'classnames'
import _ from 'lodash'

export default class NavTabs extends Component {
  static propTypes = {
    update: PropTypes.func,
    activeTab: PropTypes.string,
    tabs: PropTypes.array
  }

  render () {
    const {
      activeTab,
      tabs,
      update
    } = this.props

    const cardNavTabs = tabs.map((tab, index) => {
      const active = activeTab === tab
      const classes = classnames({
        'dib tc pointer': true,
        'fw6 bb bw2': active
      })

      let style = {
        width: `${(1 / tabs.length) * 100}%`,
        height: 50
      }
      if (active) {
        style = Object.assign({}, style, { borderColor: styles.color.primary })
      }

      return (
        <li onClick={() => { update(tab) }}
          key={index}
          className={classes}
          style={style}>
          <div className='flex justify-center h-100'>
            <div className='ph2 mt2 ws-normal f5 lh-title'>
              {_.startCase(tab)}
            </div>
          </div>
        </li>
      )
    })

    return (
      <div className='mw7 center w-100'>
        <ul className='list ma0 pa0 nowrap'>
          {cardNavTabs}
        </ul>
      </div>
    )
  }
}
