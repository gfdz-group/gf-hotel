import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterBtn extends Component {
  render() {
    const { text, to, color, bgColor } = this.props; 
    return (
      <Link to={to}>
        <div className="footer footer-btn" style={{color: color, backgroundColor: bgColor}}>
          {text}
        </div>
      </Link>
    );
  }
}

export default FooterBtn;