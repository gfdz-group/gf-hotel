import React, { Component } from 'react';
import Style from 'style-it';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      handleChecked: this.handleChecked.bind(this),
    };
  }

  handleChecked() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    
    let { 
      height,
      width,
      radius,
      left,
      bottom,
      beforeTransColor,
      transColor,
    } = this.props;

    height = height || 34;
    width = width || 60;
    radius = radius || 34;
    left = left || 4;
    bottom = bottom || 4;
    beforeTransColor = beforeTransColor || '#CCC';
    transColor = transColor || '#2196F3';

    return Style.it(`
      .switch {
        position: relative;
        display: inline-block;
        width: ${width}px;
        height: ${height}px;
      }
      .switch input { display: none; }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${beforeTransColor};
        -webkit-transition: .4s;
        transition: .4s;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: ${width-height}px;
        width: ${width-height}px;
        left: ${left}px;
        bottom: ${bottom}px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
      input:checked + .slider {
        background-color: ${transColor};
      }
      input:focus + .slider {
        box-shadow: 0 0 1px ${transColor};
      }
      input:checked + .slider:before {
        -webkit-transform: translateX(${width-height}px);
        -ms-transform: translateX(${width-height}px);
        transform: translateX(${width-height}px);
      }
      .slider.round {
        border-radius: ${radius}px;
      }
      .slider.round:before {
        border-radius: 50%;
      }      
    `,
      <label htmlFor="" className="switch" onClick={this.state.handleChecked}>
        <input type="checkbox"
          checked={this.state.checked} />
        <span className="slider round"></span>
      </label>
    );
  }
}

export default Switch;