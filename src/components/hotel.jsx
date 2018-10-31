import React, { Component } from 'react';
import Loading from './common/Loading';
import utils from '../utils';
import FooterBtn from './common/footerBtn';

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: {},
    };
  }

  componentWillMount() {
    document.title = '酒店详情';
  }

  componentDidMount() {
    const { hotelId } = this.props.match.params;
    this.callApi(hotelId)
      .then(res => {
        this.setState({hotel: res});
      })
      .catch(err => { console.error(err); });
  }

  async callApi(hotelId) {
    if(!hotelId) throw new Error('Missing hotel id parameter');
    const res = await fetch(`/api/hotel/hotelManager/getHotelInfo.do?id=${hotelId}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  navi(hotel) {
    const { latitude, longitude, hotelName, hotelAddress } = hotel;
    window.location = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${latitude},${longitude};title:${hotelName};addr: ${hotelAddress};`;
  }

  render() {
    const { hotel } = this.state;
    return (
      utils.isEmpty(hotel) ? <Loading /> :
      <div className="hotel">
        <div className="container">
          {/** banner */}
          <div className="block map-banner" onClick={() => this.navi(hotel)}>
            <div className="map">
              <div className="cover pos-r">
                {/* text */}
                <div className="text pos-a">
                  <h1>{hotel.hotelName}</h1>
                  <h2>
                    <i className="fa fa-map-marker"></i>
                    {hotel.hotelAddress}
                  </h2>
                </div>
                {/* navi icon */}
                <div className="navi pos-a">
                  <img className="icon"  src="/assets/navi.png" alt="" />
                  <span>导航</span>
                </div>
              </div>
            </div>
            <div className="phone">
              酒店电话: {hotel.phone}
            </div>
          </div>
          {/** 酒店介绍 */}
          <div className="block">
            <h1>酒店介绍</h1>
            <pre>{hotel.describe}</pre>
          </div>
          {/** 设施服务 */}
          <div className="block">
            <h1>酒店设施</h1>
            <ul className="list">
              {hotel.serve.serveType.map((s, idx) => {
                return (
                  <li className="list-item" key={idx}>
                    <h1>
                      <i className={`fa ${s.className}`}></i>
                      {s.name}
                    </h1>
                    <ul>
                     {s.children.map((c, idx) => {
                      return (
                        <li key={idx}>{c.name}</li>
                      );
                     })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
          {/** 酒店政策 */}
          <div className="block">
            <h1>酒店政策</h1>
            <ul className="list">
              <li className="list-item">
                <h1>
                  <p className="no-m">
                    入店时间：{hotel.policy.ioTime.inTime}以后
                    离店时间: 次日{hotel.policy.ioTime.outTime}以前
                  </p>
                </h1>
              </li>
              <li className="list-item">
                <h1>
                  {/*<i className="fa fa-list"></i>*/}
                  儿童政策及加床政策
                </h1>
                <ul className="vertical">
                  {hotel.policy.provisions.map((p, idx) => {
                    return (<li key={idx}>{p.text}</li>);
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <FooterBtn
            color="#FFF"
            bgColor="#20b176"
            text="立即订房"
            to={`/calendar/${this.state.hotel.id}`}
          />
        </div>
      </div>
    );
  }
}

export default Hotel;
