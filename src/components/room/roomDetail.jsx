import React, { Component } from 'react';
import Loading from '../common/Loading';
import order from '../../stores/order'
import utils from '../../utils';

class roomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
    };
  }

  componentDidMount() {
    const { roomId } = this.props;
    let { inDate } = order;
    inDate = utils.fullDateFormat(inDate);

    this.callApi(roomId, inDate)
      .then(res => {
        this.setState({ room: res })
      })
      .catch(err => { console.error(err) })
  }

  async callApi(roomId, inDate) {
    if(!roomId) { throw new Error('Missing room id parameter'); }
    const res = await fetch(`/api/hotel/hotelManager/getRoom.do?id=${roomId}&inDate=${inDate}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if(res.status!==200) { throw new Error(body.message) }
    return body
  }

  render() {
    const { room } = this.state;
    let icons = [];

    if(!utils.isEmpty(room)) {
      room.serveType.map(item => {
        item.children.map(icon => {
          icons.push(icon);
        })
      })
    }

    return (
      utils.isEmpty(room)? <Loading /> :
      <div className="room-detail slideInUp">
        <div className="container">
          <div className="room-preview" style={{backgroundImage: `url('${room.coverImagePath}')`}}></div>
          <div className="content-wrapper">
            {/** 设施 */}
            <div className="devices">
              <ul>
                {icons.map((d, idx) => {
                  return (
                    <li key={idx} className={(idx+1)%3===0?'p-l':null}>
                      <i className={`fa ${d.className}`}></i>
                      <span>{d.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/** 特色 */}
            <div className="features">
              <ul>
                {room.features.map((f, idx) => {
                  return (
                    <li key={idx}>{f.text}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default roomDetail;
