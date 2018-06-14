import React, { Component } from 'react';
import Loading from '../common/Loading';
import { isEmpty } from '../../utils';
import Banner from '../common/bannerImage';
import FooterBtn from '../common/footerBtn';

class roomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
    };
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;
    this.callApi(roomId)
      .then(res => {
        this.setState({ room: res });
      })
      .catch(err => { console.error(err); })
  }

  async callApi(roomId) {
    if(!roomId) { throw new Error('Missing room id parameter'); }
    const res = await fetch(`/api/hotel/hotelManager/getRoom.do?id=${roomId}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if(res.status!==200) { throw new Error(body.message); }
    return body;
  }
  
  render() {
    const { room } = this.state;
    //console.log(room);
    return (
      isEmpty(room)? <Loading /> :
      <div className="room-detail">
        <div className="container">
          <Banner image={room.coverImagePath} />
          {/** 特色 */}
          <div className="features">
            <h2>特色</h2>
            <ul>
              {room.features.map((f, idx) => {
                return (
                  <li key={idx}>{f.text}</li>
                );
              })}
            </ul>
          </div>
          {/** 设施 */}
          <div className="devices">
            <h2>房间设施</h2>
            <ul>
              {room.serveType[0].children.map((d, idx) => {
                return (
                  <li key={idx}>
                    <i className={`fa ${d.className}`}></i>
                    <span>{d.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <FooterBtn
          color="#FFF"
          bgColor="#4b2b95"
          text="立即预定"
          to={`/order/${room.roomId}`} />
      </div>
    );
  }
}

export default roomDetail;