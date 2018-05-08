import React, { Component } from 'react';
import RoomItem from './room/roomItem';
import Footer from './footer';

class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = '住酒店';
  }

  render() {
    return (
      <div className="roomsList">
        <div className="search">
          <span className="fa fa-search">
            <input type="text" placeholder="搜索房间" />
          </span>
        </div>
        {/** 房间列表 */}
        <ul>
          <RoomItem 
            id="1"
            img="/assets/room01.jpg"
            name="精致小套间"
            price="380"
            labels="加大床,无早,免费取消"
          />
          <RoomItem 
            id="1"
            img="/assets/room02.jpg"
            name="家庭组合房"
            price="380"
            labels="加大床,无早,免费取消"
          />
          <RoomItem 
            id="1"
            img="/assets/room03.jpg"
            name="舒适单人间"
            price="380"
            labels="单人床,无早,免费取消"
          />
          <RoomItem 
            id="1"
            img="/assets/room01.jpg"
            name="精致小套间"
            price="380"
            labels="加大床,无早,免费取消"
          />
          <RoomItem 
            id="1"
            img="/assets/room02.jpg"
            name="家庭组合房"
            price="380"
            labels="加大床,无早,免费取消"
          />
          <RoomItem 
            id="1"
            img="/assets/room03.jpg"
            name="舒适单人间"
            price="380"
            labels="单人床,无早,免费取消"
          />
        </ul>
        <Footer />
      </div>
    );
  }
}

export default RoomsList;