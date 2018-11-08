import React, { Component } from 'react';
import order from '../stores/order';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
		};
  }

  gotoOrdersList() {
    window.location = '/app/orders';
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

  componentDidMount() {
    document.title = '个人中心';
    const openId = localStorage.getItem('openId');
    if (openId) {
      this.callApi(openId)
        .then(res => {
          order.update('list', res);
          this.setState({list: res});
        });
    }
  }

	render() {
    const { list } = this.state;
		return (
			<div className="profile">
				{/** 用户头像 */}
				<div className="level">
          <div className="pro-avatar">
            <i className="fa fa-user-circle-o"></i>
          </div>
          <div className="pro-info">
            <h1>微信用户</h1>
            <h2>普通会员</h2>
          </div>
				</div>
        {/** 积分 */}
        <div className="score">
          <div className="block">
            <label>{list.length}</label>
            <span>订房订单</span>
          </div>
          <div className="block">
            <label>0</label>
            <span>商城订单</span>
          </div>
          <div className="block">
            <label>2500</label>
            <span>会员积分</span>
          </div>
        </div>
				{/** 菜单 */}
				<div className="menu">
					<ul>
						<li className="pos-r">
              <i className="fa fa-cart-plus"></i>
							积分商城
							<i className="pos-a fa fa-angle-right"></i>
						</li>
						<li className="pos-r" onClick={this.gotoOrdersList}>
              <i className="fa fa-file-text"></i>
							订单记录
							<i className="pos-a fa fa-angle-right"></i>
						</li>
            <li className="pos-r">
              <i className="fa fa-gift"></i>
							兑换记录
							<i className="pos-a fa fa-angle-right"></i>
						</li>
						<li className="pos-r">
              <i className="fa fa-map-marker"></i>
							收货地址
							<i className="pos-a fa fa-angle-right"></i>
						</li>
					</ul>
        </div>
			</div>
		);
	}
}

export default Profile;
