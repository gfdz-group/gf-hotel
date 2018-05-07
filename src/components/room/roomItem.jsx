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
      <li className="room" key={id}>
        <Link to={`/room/${id}`}>
        <img src={img} alt="" />
        <div className="desc">
          {name}
          <div className="labels">
            {labels.map((label, idx) => {
            return (
              <span key={idx}>{label}</span>
            );
            })}
          </div>
        </div>
        <button className="white orange-bg">¥{price} /晚</button>
        </Link>
      </li>
    );
  }
}

export default RoomItem;