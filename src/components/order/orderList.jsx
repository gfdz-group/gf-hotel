import React, { Component } from 'react';
import order from '../../stores/order';
import { view } from 'react-easy-state';

class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    document.title = '我的订单';
    const openId = localStorage.getItem('openId');
    if (openId) {
      this.callApi(openId)
        .then(res => {
          order.update('list', res);
        });
    }
  }

  async callApi(openId) {
    const res = await fetch(`/api/hotel/hotelManager/getHotelOrderList.do?openId=${openId}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if (res.status !== 200) {
      throw new Error(body.message);
    }
    return body;
  }

  handleClick(item) {
    const { id, status } = item;
    const openId = localStorage.getItem('openId');
    if (!openId || openId === 'null') {
      alert('获取微信用户ID失败');
      return;
    }
    if (status === '未支付') {
      window.location = `http://gfjd.wyglpt.com/api/hotel/hotelManager/orderPays.do?ids=${id}&openId=${openId}`
    }
  }

  render() {
    const { list } = order;
    return (
      <div className="order-list">
        <ul>
          {list.map((item, idx) => {
            return (
              <li key={item.id}>
                {/** block header */}
                <div className="hd">
                  <label>单号</label>
                  <em>{item.orderNo}</em>
                </div>
                {/** block body */}
                <div className="bd">
                  <div className="item">
                    <label>房型</label>
                    <em>{item.roomType}</em>
                  </div>
                  <div className="item">
                    <label>预定数量</label>
                    <em>{item.roomsCount}</em>
                  </div>
                  <div className="item">
                    <label>入住</label>
                    <em>{item.inDate}</em>
                  </div>
                  <div className="item">
                    <label>离店</label>
                    <em>{item.outDate}</em>
                  </div>
                  <div className="item">
                    <label>金额</label>
                    <em>{item.price}元</em>
                  </div>
                </div>
                {/** block footer */}
                <div className="ft" onClick={() => this.handleClick(item)}>
                  <span>{item.status}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default view(OrderList);
