import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { view } from 'react-easy-state';
import Switch from '../common/switch';
import Loading from '../common/Loading';
import order from '../../stores/order';
import utils from '../../utils';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelName: null,
      roomName: null,
      username: '',
      phone: '',
      productId: props.match.params.roomId,
      price: 0,
      openId: localStorage.getItem('openId'),
      handleChange: this.handleChange.bind(this),
    };
  }

  componentDidMount() {
    document.title = '创建订单';

    const { roomId } = this.props.match.params;
    let { inDate } = order;
    inDate = utils.fullDateFormat(inDate);

    if(roomId) {
      fetch(`/api/hotel/hotelManager/getRoom.do?id=${roomId}&inDate=${inDate}`)
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
    const { username, phone } = this.state;
    const openId = localStorage.getItem('openId');
    if (username.trim()===''||phone.trim()==='') {
      alert('联系人信息填写不完整');
      return;
    }
    if (!openId || openId === 'null') {
        alert('获取微信用户ID失败')
        return;
    }
    this.callApi(openId)
      .then(res => {
        if(res.feedbackcode===1) {
          const url = `${res.orderPayLink}&openId=${openId}`;
          window.location = url;
        } else {
          alert(res.message);
        }
      });
  }

  async callApi(openId) {
    let { inDate, outDate } = order;
    inDate = utils.fullDateFormat(inDate);
    outDate = utils.fullDateFormat(outDate);

    const res = await fetch('/api/hotel/hotelManager/createOrder.do', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        linkMan: `${this.state.username}`,
        phone: this.state.phone,
        productId: this.state.productId,
        price: (this.state.price * order.roomsCount * order.daysDiff).toFixed(2),
        inDate: inDate,
        outDate: outDate,
        days: order.daysDiff,
        roomsCount: order.roomsCount,
        adultNumber: order.adultNumber,
        childrenNumber: order.childrenNumber,
        isReceiveSMS: 1,
        openId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    const body = await res.json();
    return body;
  }

  render() {
    const { username, phone, hotelName, roomName, price } = this.state;
    const inDateShow = utils.dateFormat(order.inDate);
    const outDateShow = utils.dateFormat(order.outDate);
    return (
      (isEmpty(hotelName) || isEmpty(roomName)) ? <Loading /> :
      <div className="order">
        <div className="container">
          {/** 酒店信息 */}
          <div className="hotel-info">
            <h2>{hotelName}</h2>
            <ul className="room-info">
              <li>
                <span>入住 {inDateShow}</span>
                <span>离店 {outDateShow}</span>
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
                    const count = order.roomsCount;
                    if (count>1) {
                      order.update('roomsCount', count-1);
                    }
                  }} />
                  <span className="roomsCount">{order.roomsCount}</span>
                  <span className="iconfont icon-plus" onClick={() => {
                    const count = order.roomsCount;
                    order.update('roomsCount', count+1);
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
              <div className="form-group" style={{borderWidth: 0}}>
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

export default view(Order);
