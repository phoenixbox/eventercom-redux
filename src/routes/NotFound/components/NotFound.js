// React
import React, {
  PropTypes,
  Component
} from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const props = {
      title: "Whoops!",
      desc: "Sorry, we can't find the page you are looking for.",
      suggestion: "Are you looking for one of these?"
    }

    return (
      <section className="vh-100">
        <header className="tc ph5 lh-copy">
          <h1 className="f1 f-headline-l mb3 dib tracked-tight">{props.title}</h1>
          <div className="tc f3">{props.desc}</div>
        </header>
        <p className="tc mt4 mt5-l f4 f3-l">{props.suggestion}</p>
        <ul className="list tc pl0 w-100 mt5">
          <li className="dib"><Link className="f5 f4-ns link black db pv2 ph3 hover-light-purple" to="/a/dashboard">Dashboard</Link></li>
        </ul>
      </section>
    )
  }
}

module.exports = NotFound
