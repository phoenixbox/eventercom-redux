import React, {
  PropTypes,
  Component
} from 'react';
import _ from 'lodash';
import {
  EventCard
} from '..'
import SeedEvents from '../../store/seeds/events'

export default class EventList extends Component {
  eventNodes() {
    return SeedEvents.map((event, ix) => {
      return <EventCard key={ix} {...event} />
    })
  }

  render() {
    return (
      <div className="flx">
        <ul className="list pa2">
          {this.eventNodes()}
        </ul>
      </div>
    )
  }
}
