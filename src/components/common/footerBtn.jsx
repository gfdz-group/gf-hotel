import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterBtn extends Component {
  render() {
    const { text, to, color, bgColor } = this.props; 
    return (
      <div className="footer footer-btn" style={{color: color, backgroundColor: bgColor}}>
        <Link to={to}>
          {text}
        </Link>
      </div>
    );
  }
}

export default FooterBtn;