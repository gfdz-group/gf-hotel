import React, { Component } from 'react';
import RoomItem from './room/roomItem';
import Loading from './common/Loading';
import BannerImage from './common/bannerImage'
import HotelInfoBanner from './hotel/InfoBanner'
import HotelCommentBanner from './hotel/Comment'

class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: null,
      hotelId: this.props.match.params.hotelId,
      rooms: null,
    };
  }

  componentWillMount() {
    document.title = '住酒店';
  }

  componentDidMount() {
    // hotel
    this.callApi(`/api/hotel/hotelManager/getHotelInfo.do?id=${this.state.hotelId}`)
      .then(res => this.setState({hotel: res}))
      .catch(err => console.error(err));
    // room list
    this.callApi(`/api/hotel/hotelManager/queryRoom.do?id=${this.state.hotelId}`)
      .then(res => this.setState({rooms: res.roomList}))
      .catch(err => console.error(err));
  }

  async callApi(url) {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      this.state.rooms && this.state.hotel ? (
      <div className="roomsList">
        <div>
          <BannerImage image={this.state.hotel.faceImagePath}/>
          <HotelInfoBanner hotel={this.state.hotel} />
          <HotelCommentBanner />
        </div>
        <div className="list">
          <h1 className="ta-c">预定酒店</h1>
          <ul>
            {this.state.rooms.map((r, idx) =>
              <RoomItem
                key={idx}
                id={r.id}
                img={r.imagePath}
                name={r.name}
                originPrice={r.originPrice}
                price={r.price}
                labels="无早,免费取消"
              />)}
          </ul>
        </div>
      </div>) : <Loading />
    );
  }
}

export default RoomsList;
