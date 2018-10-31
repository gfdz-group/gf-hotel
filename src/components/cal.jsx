import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state'
import utils from '../utils';
import FooterBtn from './common/footerBtn';
import { Carousel } from 'react-responsive-carousel';
import hotels from '../stores/hotels';
import order from '../stores/order'
import 'react-responsive-carousel/lib/styles/carousel.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const hotelId = this.props.match.params.hotelId? this.props.match.params.hotelId: ( !hotels.isEmpty ? hotels[0].id : null );

    this.state = {
      hotelId,
      handleChange: this.handleChange.bind(this),
      handleNavi: this.handleNavi.bind(this),
    };
  }

  handleChange(field, value) {
    this.setState({[field]: value});
  }

  handleNavi() {
    const { hotelId } = this.state;
    if(!hotelId || hotels.isEmpty) return;
    const hotel = hotels.all.find(h => h.id === hotelId);
    const { latitude, longitude, hotelName, hotelAddress } = hotel;
    window.location = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${latitude},${longitude};title:${hotelName};addr: ${hotelAddress};`;
  }

  componentDidMount() {
    document.title = '入住时间';
  }

  render() {
    const inDateShow = utils.dateFormat(order.inDate);
    const outDateShow = utils.dateFormat(order.outDate);
    return (
      <div className="cal">

        <Carousel showArrows={false} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
          <div>
            <img src="/assets/banner1.png" alt="" />
          </div>
          <div>
            <img src="/assets/banner2.png" alt=""/>
          </div>
        </Carousel>

        {/** 酒店地址选择 */}
        <div className="select-wrapper" style={{ display: hotels.isEmpty ? 'none' : 'flex' }}>
          <select
            className="pos"
            onChange={evt => {
              this.state.handleChange('hotelId', evt.target.value);
            }}
          >
            { hotels.all.map((h, idx) => {
              return (
                <option
                  key={idx}
                  value={h.id}
                  selected={h.id===this.state.hotelId}
                >当前位置: {h.city} {h.hotelName}</option>
              );
            })}
          </select>
          <i className="fa fa-map-marker" onClick={this.state.handleNavi}></i>
        </div>
        {/** 入住时间选择 */}
        <div className="date-picker">
          <div className="in ta-c di-b">
            <label className="db">入住日期</label>
            <span className="date">
              <Link to="/date-picker">
                {inDateShow}
              </Link>
            </span>
          </div>
          {/** divider */}
          <div className="divider ta-c">
            <span className="fa fa-calendar ta-c"></span>
            <div>共&nbsp;{order.daysDiff}&nbsp;晚</div>
          </div>
          {/** end of divider */}
          <div className="out ta-c di-b">
            <label className="db">退房日期</label>
            <span className="date">
              <Link to="/date-picker">
                {outDateShow}
              </Link>
            </span>
          </div>
        </div>
        {/** 数量选择 */}
        <div>
          <div className="number-picker">
            <div className="number-picker-inner">
              <label className="lbl-title">房间数量</label>
              <div className="picker">
                <span className="iconfont icon-minus" onClick={() => {
                  const count = order.roomsCount;
                  if(count>1) {
                    order.update('roomsCount', count-1);
                  }
                }}></span>
                <h1>{order.roomsCount}</h1>
                <span className="iconfont icon-plus" onClick={() => {
                  const count = order.roomsCount;
                  order.update('roomsCount', count+1);
                }}></span>
              </div>
            </div>
          </div>
          <div className="number-picker">
            <div className="number-picker-inner">
              <label className="lbl-title">成人 (每间)</label>
              <div className="picker">
                  <span className="iconfont icon-minus" onClick={() => {
                    const num = order.adultNumber;
                    if(num>1) {
                      order.update('adultNumber', num-1);
                    }
                  }}></span>
                  <h1>{order.adultNumber}</h1>
                  <span className="iconfont icon-plus" onClick={() => {
                    const num = order.adultNumber;
                    order.update('adultNumber', num+1);
                  }}></span>
              </div>
            </div>
          </div>
          <div className="number-picker">
            <div className="number-picker-inner">
              <label className="lbl-title">儿童 (每间)</label>
              <div className="picker">
                  <span className="iconfont icon-minus" onClick={() => {
                      const num = order.childrenNumber;
                      if(num>0) {
                        order.update('childrenNumber', num-1)
                      }
                  }}></span>
                  <h1>{order.childrenNumber}</h1>
                  <span className="iconfont icon-plus" onClick={() => {
                      const num = order.childrenNumber;
                      order.update('childrenNumber', num+1);
                  }}></span>
              </div>
            </div>
          </div>
        </div>

        <FooterBtn
           color="#FFF"
           bgColor="#20b176"
           text="查询"
           to={`/rooms/${this.state.hotelId}`}
        />
      </div>
    );
  }
}

export default view(Calendar);
