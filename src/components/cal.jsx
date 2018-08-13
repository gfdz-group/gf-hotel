import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import utils from '../utils';
import FooterBtn from './common/footerBtn';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const hotels = JSON.parse(localStorage.getItem('hotelLists'));
    const hotelId = this.props.match.params.hotelId? this.props.match.params.hotelId: hotels[0].id;
    const order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};

    const curr = new Date();
    curr.setDate(curr.getDate()+1);

    this.state = {
      hotels,
      hotelId,
      order: {
        inDate: curr,
        outDate: curr.getDate()+1,
        inDateShow: utils.dateFormat(new Date()),
        outDateShow: utils.dateFormat(curr),
        daysDiff: 1,
        roomsCount: order && order.roomsCount || 1,
        adultNumber: order && order.adultNumber || 1,
        childrenNumber: order && order.childrenNumber || 0,
      },
      handleChange: this.handleChange.bind(this),
    };
  }

  handleChange(field, value) {
    this.setState({[field]: value});
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('order', JSON.stringify(this.state.order));
  }

  resetLocalStorage() {
    localStorage.setItem('order', null);
  }

  componentDidMount() {
    document.title = '房间';
    this.resetLocalStorage();
  }

  componentWillUnmount() {
    this.updateLocalStorage();
  }

  render() {
    const { order } = this.state;
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
        <div className="select-wrapper">
          <select
            className="pos"
            onChange={evt => {
              this.state.handleChange('hotelId', evt.target.value);
            }}
          >
            { this.state.hotels.map((h, idx) => {
              return (
                <option
                  key={idx}
                  value={h.id}
                  selected={h.id===this.state.hotelId}
                >当前位置: {h.city} {h.hotelName}</option>
              );
            })}
          </select>
          <i className="fa fa-map-marker"></i>
        </div>
        {/** 入住时间选择 */}
        <div className="date-picker">
          <div className="in ta-c di-b">
            <label className="db">入住日期</label>
            <span className="date">
              <Link to="/date-picker">
                {order.inDateShow}
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
                {order.outDateShow}
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
                    this.state.handleChange('order', {
                      ...order,
                      roomsCount: count-1,
                    })
                  }
                }}></span>
                <h1>{order.roomsCount}</h1>
                <span className="iconfont icon-plus" onClick={() => {
                  const count = order.roomsCount;
                  this.state.handleChange('order', {
                    ...order,
                    roomsCount: count+1,
                  });
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
                          this.state.handleChange('order', {
                              ...order,
                              adultNumber: num-1,
                          });
                      }
                  }}></span>
                  <h1>{order.adultNumber}</h1>
                  <span className="iconfont icon-plus" onClick={() => {
                      const num = order.adultNumber;
                      this.state.handleChange('order', {
                          ...order,
                          adultNumber: num+1,
                      });
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
                          this.state.handleChange('order', {
                              ...order,
                              childrenNumber: num-1,
                          });
                      }
                  }}></span>
                  <h1>{order.childrenNumber}</h1>
                  <span className="iconfont icon-plus" onClick={() => {
                      const num = order.childrenNumber;
                      this.state.handleChange('order', {
                          ...order,
                          childrenNumber: num+1,
                      })
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

export default Calendar;
