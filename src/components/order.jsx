import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import Header from './header';
import Switch from './common/switch';
import Loading from './common/Loading';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      hotelName: null,
      roomName: null,
      username: null,
      phone: '',
      productId: props.match.params.roomId,
      price: 0,
      openId: localStorage.getItem('openId'),
      handleChange: this.handleChange.bind(this),
    };
  }

  componentWillMount() {
    document.title = '创建订单';

    /** cache order */
    if(localStorage.getItem('order')) {
      const order = JSON.parse(localStorage.getItem('order'));
      this.setState({order});
    }
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;
    if(roomId) {
      fetch(`/api/hotel/hotelManager/getRoom.do?id=${roomId}`)
        .then(res => {
          res.json().then(body => {
            this.setState({
              hotelName: body.hotelName,
              roomName: body.roomName,
              price: body.privilegePrice,
            });
          });
        });
    }
  }

  handleChange(fieldName, value) {
    this.setState({[fieldName]: value});
  }

  postData() {
    return false;
    // this.callApi()
    //   .then(res => {
    //     if(res.feedbackcode===1) {
    //       const url = `${res.orderPayLink}&openId=${localStorage.getItem('openId')}`;
    //       window.location = url;
    //     }
    //   });
  }

  async callApi() {
    const res = await fetch('/api/hotel/hotelManager/createOrder.do', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        linkMan: `${this.state.username}}`,
        phone: this.state.phone,
        productId: this.state.productId,
        price: (this.state.price * this.state.order.roomsCount * this.state.order.daysDiff).toFixed(2),
        inDate: this.state.order.inDate,
        outDate: this.state.order.outDate,
        days: this.state.order.daysDiff,
        roomsCount: this.state.order.roomsCount,
        adultNumber: this.state.order.adultNumber,
        childrenNumber: this.state.order.childrenNumber,
        isReceiveSMS: 1,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    const body = await res.json();
    return body;
  }

  render() {
    const { username, phone, hotelName, roomName, order, price } = this.state;
    return (
      (isEmpty(hotelName) || isEmpty(roomName)) ? <Loading /> :
      <div className="order">
        <div className="container">
          {/** 酒店信息 */}
          <div className="hotel-info">
            <h2>{hotelName}</h2>
            <ul className="room-info">
              <li>
                <span>入住 {order.inDateShow}</span>
                <span>离店 {order.outDateShow}</span>
                <span>共 {order.daysDiff} 晚</span>
              </li>
              <li>
                <span>{roomName}</span>
                <span>双早</span>
                <span>免费取消</span>
              </li>
            </ul>
          </div>
          {/** 联络信息 */}
          <div className="order-info">

            <div className="form-group-wrapper">
              <div className="form-group" style={{justifyContent: 'space-between'}}>
                <label htmlFor="">房间数</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span className="iconfont icon-minus" onClick={() => {
                    if(order.roomsCount>1)
                      this.setState({
                        order: Object.assign(order, { roomsCount: order.roomsCount-1 })
                      })
                  }} />
                  <span className="roomsCount">{order.roomsCount}</span>
                  <span className="iconfont icon-plus" onClick={() => {
                    this.setState({
                      order: Object.assign(order, { roomsCount: order.roomsCount+1 })
                    })
                  }} />
                </div>
              </div>
            </div>

            <div className="form-group-wrapper">
              <div className="form-group">
                <label htmlFor="">入住人</label>
                <input type="text" placeholder="请输入入住人姓名"
                  value={username}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    this.state.handleChange('username', value);
                  }}
                />
              </div>
            </div>

            <div className="form-group-wrapper">
              <div className="form-group">
                <label htmlFor="">手机号</label>
                <input type="text" placeholder="请输入入住人手机"
                  value={phone}
                  onChange={(evt) => {
                    const value=  evt.target.value;
                    this.state.handleChange('phone', value);
                  }}
                />
              </div>
            </div>

            <div className="form-group-wrapper">
              <div className="form-group" style={{ justifyContent: 'space-between' }}>
                <div className="coupon">
                  <h2>优惠券</h2>
                  <span>选择优惠券</span>
                </div>
                <div className="coupon">
                  <h2>积分抵用</h2>
                  <span>可用 0 积分</span>
                  <span>抵用¥ 0</span>
                </div>
                <div>
                  <Switch
                    height={23.8}
                    width={42}
                    left={3}
                    bottom={3}
                    transColor={'#2bb078'}
                  />
                </div>
              </div>
            </div>

            <div className="form-group-wrapper">
              <div className="form-group">
                <label htmlFor="">备注</label>
                <input type="text" placeholder="无" />
              </div>
            </div>
          </div>

          {/** 微信支付 */}
          <h2 className="wechat-pay-text">支付方式</h2>
          <div className="wechat-pay-label pos-r">
            <i className="fa fa-check-circle pos-a" aria-hidden="true"></i>
            <div className="wechat-pay-label-inner pos-a">
              <img src="/assets/wechat.png" alt="" />
              <span>微信支付</span>
            </div>
          </div>

          {/** 支付结算 */}
          <div className="footer no-border">
            <div>
                微信会员价 <span className="price">￥{(price * order.roomsCount * order.daysDiff).toFixed(2)}</span>
              {/*<span className="db">已包含双早费及服务费</span>*/}
            </div>
            <button onClick={() => {
              this.postData();
            }}>立即支付</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
