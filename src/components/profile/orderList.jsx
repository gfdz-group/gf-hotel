import React, { Component } from 'react';
import Header from '../../components/header';

const openId = localStorage.getItem('openId');

class OrderList extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({list: res});
      })
      .catch(err => { console.error(err); })
  }

  async callApi() {
    const res = await fetch(`/api/hotel/hotelManager/getHotelOrderList.do?openId=${openId}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  handleClick(order) {
    const { id, status } = order;
    const url = `http://peys.wyglpt.com/api/hotel/hotelManager/orderPays.do?ids=${id}&openId=${openId}`
    if(status !== '已支付') window.location = url;
  }

  render() {
    const { list } = this.state;
    return (
      <div className="order-list">
        <Header title="我的订单" />
        {list.length ?
        <ul>
          {list.map((order, idx) => {
            return (
              <li key={idx} onClick={this.handleClick.bind(this, order)}>
                <div>
                  <label>订单号</label>
                  <span>{order.orderNo}</span>
                </div>
                <div>
                  <label>房型</label>
                  <span>{order.roomType}</span>
                </div>
                <div>
                  <label>入住</label>
                  <span>{order.inDate}</span>
                </div>
                <div>
                  <label>离店</label>
                  <span>{order.outDate}</span>
                </div>
                <div>
                  <label>天数</label>
                  <span>{order.days}晚</span>
                </div>
                <div>
                  <label>房间数</label>
                  <span>{order.roomsCount}间</span>
                </div>
                <div>
                  <label>金额</label>
                  <span>{order.price} 元</span>
                </div>
                <div>
                  <label>状态</label>
                  <span>{order.status}</span>
                </div>
              </li>
            )
          })}
        </ul> : <h5>暂无数据</h5>}
      </div>
    )
  }
}

export default OrderList;
