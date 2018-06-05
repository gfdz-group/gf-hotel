import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoomItem extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render() {
    const { id, img, name, price } = this.props;
    let { labels } = this.props;

    labels = labels.split(',');

    return (
      <li className="room pos-r" key={id} style={{backgroundImage: `url(${img})`}}>
          <div class="shade">
            <Link to={`/room/${id}`}>
            <img src={img} alt="" />
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
            <a className="white orange-bg pos-a">¥&nbsp;{price} <span>起 每晚</span></a>
            </Link>
          </div>
      </li>
    );
  }
}

export default RoomItem;