import React, { Component } from 'react';
import Loading from './common/Loading';
import { isEmpty } from '../utils';
import Header from './header';
import Banner from './common/bannerImage';
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

  render() {
    const { hotel } = this.state;
    return (
      isEmpty(hotel) ? <Loading /> : 
      <div className="hotel">
        <Header title="丽江官房大酒店"></Header>
        <div className="container">
          {/** banner */}
          <div className="block no-p">
            <Banner image={hotel.faceImagePath} />
            {/** 酒店位置 */}
            <div className="text pos-r">
              <span className="addr">{hotel.hotelAddress}</span>
              <i className="fa fa-map-marker pos-a"></i>
            </div>
          </div>
          {/** 酒店介绍 */}
          <div className="block">
            <h1>关于酒店</h1>
            <pre>{hotel.describe}</pre>
            <div className="link">
              <i className="fa fa-chevron-down"></i>
            </div>
          </div>
          {/** 设施服务 */}
          <div className="block">
            <h1>设施服务</h1>
            {/** 相册 */}
            {hotel.serve.serveImages.length?(
              <div className="gallery">
                <div style={{width: 650}}>
                  {hotel.serve.serveImages.map((im, idx) => {
                    return (
                      <div className="block pos-r" key={idx}>
                        <img src={im.firstImagePath} alt="" />
                        <div className="title pos-a ta-c">{im.name}({im.number})</div>
                      </div>
                    );
                  })}
                  <div className="clear"></div>
                </div>
              </div>
            ):null}
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
                  {/*<i className="fa fa-clock-o"></i>*/}
                  入离时间
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
            bgColor="#494e5d"
            text="我要订房"
            to={`/calendar/${this.state.hotel.id}`}
          />
        </div>
      </div>
    );
  }
}

export default Hotel;