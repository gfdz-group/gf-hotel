import React, { Component } from 'react';
import RoomItem from './room/roomItem';
import Loading from './common/Loading';
import Footer from './footer';

class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelId: this.props.match.params.hotelId,
      rooms: null,
    };
  }

  componentWillMount() {
    document.title = '住酒店';
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({rooms: res.roomList});
      })
      .catch(err => { console.error(err); });
  }

  async callApi() {
    const res = await fetch(`/api/hotel/hotelManager/queryRoom.do?id=${this.state.hotelId}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      this.state.rooms? (
      <div className="roomsList">
        <div className="search">
          <span className="fa fa-search">
            <input type="text" placeholder="搜索房间" />
          </span>
        </div>
        {/** 房间列表 */}
        <ul>
          {this.state.rooms.map((r, idx) => {
            return (
              <RoomItem
                key={idx}
                id={r.id}
                img={r.imagePath}
                name={r.name}
                price={r.price}
                labels="无早,免费取消"
              />
            );
          })}
        </ul>
        <Footer />
      </div>) : <Loading />
    );
  }
}

export default RoomsList;