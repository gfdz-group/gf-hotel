import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoomItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: typeof props.expanded === 'boolean' ? props.expanded : false,
    };
  }
  render() {
    const { id, img, name, price, originPrice } = this.props;
    const { expanded } = this.state;
    let { labels } = this.props;

    labels = labels.split(',');

    return (
      <li className="room pos-r" key={id} onClick={this.props.onClick}>
        <div className="shade-wrapper pos-r" style={{backgroundImage: `url(${img})`}}>
          <div className="shade">
            <div className="desc pos-a">
              {name}
              <div className="labels">
                {labels.map((label, idx) => {
                return (
                  <span className="di-b" key={idx}>{label}</span>
                );
                })}
              </div>
            </div>
          </div>
        </div>
        {/** price **/}
        <div className="toggle-bar">
          <div className={`price ${expanded?'price-expanded':null}`}>
            <span>¥</span>
            <div className="di-b origin">{ originPrice%1===0 ? (parseInt(originPrice)).toFixed(2) : originPrice}</div>
            起
          </div>
          {/** 展开/收起 */}
          <div className="toggle-btn">
            { !expanded ?
              <div onClick={evt => { evt.stopPropagation(); this.setState({ expanded: true }) }}>
                <i className="fa fa-angle-down"></i>
                更多
              </div> :
              <div onClick={evt => { evt.stopPropagation(); this.setState({ expanded: false }) }}>
                <i className="fa fa-angle-up"></i>
                收起
              </div> }
          </div>
        </div>
        {/** go to order */}
        { expanded && <div className="order-bar">
          <div className="price">
            微信专享价
            <span>¥ {price%1===0 ? (parseInt(price)).toFixed(2): price} </span>
          </div>
          <div className="order-btn">
            <Link to={`/order/${id}`}>预订</Link>
          </div>
        </div> }
      </li>
    );
  }
}

export default RoomItem;
