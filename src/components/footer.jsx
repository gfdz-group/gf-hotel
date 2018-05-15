import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="block">
          <NavLink exact to="/hotels">
            <i className="fa fa-home icon"></i>
            <span>品官房</span>
          </NavLink>
        </div>
        <div className="block">
          <NavLink to="/calendar">
            <i className="fa fa-star icon"></i>
            <span>住酒店</span>
          </NavLink>
        </div>
        <div className="block">
          <NavLink to="/profile">
            <i className="fa fa-user icon"></i>
            <span>我在线</span>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Footer;