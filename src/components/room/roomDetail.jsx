import React, { Component } from 'react';
import Header from '../header';
import Banner from '../common/bannerImage';
import FooterBtn from '../common/footerBtn';

class roomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: '精致小套间',
      features: [
        '精致豪华小套间',
        '配备宽敞的起居室和独立的客用洗手间',
        '房间面积为70平方米/753平方英尺',
      ],
      devices: [
        { icon: 'fa-bath', name: '独立卫浴' },
        { icon: 'fa-bed', name: '大床1.8m' },
        { icon: 'fa-bluetooth', name: '免费' },
        { icon: 'fa-square', name: '60m' },
        { icon: 'fa-users', name: '2人' },
        { icon: 'fa-building', name: '6-11层' },
        { icon: 'fa-bed', name: '不可以加床' },
        { icon: 'fa-building-o', name: '有窗' },
        { icon: 'fa-wifi', name: '有' }
      ],
    };
  }
  
  render() {
    return (
      <div className="room-detail">
        <Header title={this.state.name} />
        <div className="container">
          <Banner image="/assets/room03.jpg" />
          {/** 特色 */}
          <div className="features">
            <h2>特色</h2>
            <ul>
              {this.state.features.map((f, idx) => {
                return (
                  <li key={idx}>{f}</li>
                );
              })}
            </ul>
          </div>
          {/** 设施 */}
          <div className="devices">
            <h2>房间设施</h2>
            <ul>
              {this.state.devices.map((d, idx) => {
                return (
                  <li key={idx}>
                    <i className={`fa ${d.icon}`}></i>
                    <span>{d.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <FooterBtn
          color="#FFF"
          bgColor="#ce3a45"
          text="立即预定"
          to={`/order/${this.state.id}`} />
      </div>
    );
  }
}

export default roomDetail;