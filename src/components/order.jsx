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

      firstName: '', 
      lastName: '',
      //linkMan: 'Yang Ke',
      phone: '',
      productId: props.match.params.roomId,
      price: 0,
      //inDate: '2018-05-01',
      //outDate: '2018-05-03',
      //days: 2,
      //adultNumber: 2,
      //childrenNumber: 1,
      isReceiveSMS: 1,
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
      //console.log(order);
    }
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;
    //console.log(roomId);
    if(roomId) {
      fetch(`/api/hotel/hotelManager/getRoom.do?id=${roomId}`)
        .then(res => {
          res.json().then(body => {
            //console.log('body:', body);
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
    this.callApi()
      .then(res => {
        if(res.feedbackcode===1) {
          const url = `${res.orderPayLink}&openId=${localStorage.getItem('openId')}`;
          //console.log('url:', url);
          window.location = url;
        }
      });
  }

  async callApi() {
    const res = await fetch('/api/hotel/hotelManager/createOrder.do', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        linkMan: `${this.state.firstName} ${this.state.lastName}`,
        phone: this.state.phone,
        productId: this.state.productId,
        price: this.state.price * this.state.order.roomsCount,
        inDate: this.state.order.inDate,
        outDate: this.state.order.outDate,
        days: this.state.order.daysdiff,
        adultNumber: this.state.order.adultNumber,
        childrenNumber: this.state.order.childrenNumber,
        isReceiveSMS: this.state.isReceiveSMS,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    const body = await res.json();
    return body;
  }
  
  render() {
    const { firstName, lastName, phone, hotelName, roomName, order, price } = this.state;

    return (
      (isEmpty(hotelName) || isEmpty(roomName)) ? <Loading /> :
      <div className="order">
        <Header title="预定" />
        <div className="container">
          {/** 酒店信息 */}
          <div className="block">
            <h2 className="orange">{hotelName}</h2>
            <ul className="room-info">
              <li><span>{roomName}</span></li>
              <li><span>入住/退房日期：{order.inDate} / {order.outDate}&nbsp;&nbsp;共{order.daysdiff}晚</span></li>
              <li><span>成人（每间）: {order.adultNumber}</span></li>
              <li><span>12岁以下儿童（每间）: {order.childrenNumber}</span></li>
            </ul>
            <div className="extra">
              <span className="di">房间数量: {order.roomsCount}</span>
              <span className="di fr light-blue">编辑</span>
            </div>
          </div>
          {/** 联络信息 */}
          <div className="block">
            <h2>联络信息</h2>
            <input className="db" type="text" placeholder="姓， 请用中文、英文或拼音填写" 
              value={firstName}
              onChange={(evt) => {
                const value = evt.target.value;
                this.state.handleChange('firstName', value);
              }} />
            <input className="db" type="text" placeholder="名， 请用中文、英文或拼音填写" 
              value={lastName}
              onChange={(evt) => {
                const value = evt.target.value;
                this.state.handleChange('lastName', value);
              }}
            />
            <input className="db" type="text" placeholder="手机号码"
              value={phone}
              onChange={(evt) => {
                const value=  evt.target.value;
                this.state.handleChange('phone', value);
              }}
            />
            <div className="extra">
              <span className="di">  是否接收确认短信</span>
              <div className="di fr">
                <Switch
                  height={23.8}
                  width={42}
                  left={3}
                  bottom={3}
                  transColor={'#36ab60'}
                />
              </div>
            </div>
          </div>
          {/** 附加信息 */}
          <div className="block">
            <ul className="list">
              <li className="pos-r">
                抵达酒店时间
                <span className="di fr">选择时间</span>
              </li>
              <li className="pos-r">
                  备选要求<span>无</span>
                  <i className="pos-a fa fa-angle-right"></i>
              </li>
              <li className="pos-r no-border">
                发票<span>请到前台索取发票</span>
              </li>
            </ul>            
          </div>
          {/** 支付结算 */}
          <div className="footer no-border">
            <div>
                微信会员价 <span className="red">￥{price * order.roomsCount}</span>
              {/*<span className="db">已包含双早费及服务费</span>*/}
            </div>
            <button onClick={() => {
              this.postData();
            }}>提交订房</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;