import React, {
  PropTypes,
  Component
} from 'react'
import Slider from 'rc-slider';

export default class RadiusSlider extends Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    setControls: React.PropTypes.func
  }

  static defaultProps = {
    min: 0,
    max: 300,
    step: 5,
    value: 100
  }

  render() {
    const {
      min, max, step, value, setControls
    } = this.props

    const sliderProps = {
      value,
      min,
      max,
      step,
      onChange: (value) => {
        setControls({radius: value})
      }
    }

    return (
      <div className='flx mt2'>
        <div className="f6 f5-ns lh-copy pl1">Drag the slider to change the distance range.</div>
        <div className="flx flx-row pa2">
          <Slider {...sliderProps}>
            <span className='handle-value'></span>
          </Slider>
          <div style={{width: '5rem'}}className="f6 lh-copy pl3">{`${value} km`}</div>
        </div>
      </div>
    )
  }
}
