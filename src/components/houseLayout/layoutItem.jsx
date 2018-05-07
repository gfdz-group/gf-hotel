import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HouseLayoutItem extends Component {
  render() {
    const { id, name, features, packages } = this.props;
    return (
      <li className="house-layout-item">
        <div className="image pos-r">
          <span className="pos-a">{name}</span>
        </div>
        {/** 特色 */}
        <Link to={`/layout/${id}`} style={{ textDecoration: 'none' }}>
          <ul className="features pos-r">
            <h2>特色</h2>
            {features.map((f, idx) => {
              return (<li>{f}</li>);
            })}
            <i className="fa fa-chevron-right pos-a"></i>          
          </ul>
        </Link>
        {/** 套餐列表 */}
        <ul className="packages">
          {packages.map((pa, idx) => {
            return (
              <li className="package">
                <h2>{pa.name}</h2>
                <ul className="labels">
                  {pa.labels.map((label, idx) => {
                    return (
                      <li className="label">{label}</li>
                    );
                  })}
                </ul>
                <div className="price">
                  <h2>￥{pa.price}</h2>
                  <Link to="/order/1">
                    <button>立即预定</button>
                  </Link>
                  <span>{pa.note}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}

export default HouseLayoutItem;