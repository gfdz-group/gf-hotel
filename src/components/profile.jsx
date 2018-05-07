import React, { Component } from 'react';
import Footer from './footer';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="profile">
				{/** 用户登记 */}
				<div className="level orange-bg">
					<div className="row">
						<h1 className="di">Zhang San</h1>
						<label htmlFor="">黄金</label>
					</div>
					<h2>679500321357</h2>
					{/** 升级提示 */}
					<div className="row tips">
						<span>还需20晚 升级至翡翠级</span>
					</div>
				</div>
				{/** 积分 */}
				<div className="score white-bg">
					<h2>可用于兑换积分</h2>
					<div className="row">
						<h1 className="di">0</h1>
						<button className="fr">立即兑换</button>
					</div>
				</div>
				{/** 列表 */}
				<ul>
					<li className="pos-r">
						我的交易记录
						<i className="pos-a fa fa-chevron-right"></i>
					</li>
					<li className="pos-r">
						兑换成员名单
						<i className="pos-a fa fa-chevron-right"></i>
					</li>
				</ul>

				<ul>
					<li className="pos-r">
						我的资料
						<i className="pos-a fa fa-chevron-right"></i>
					</li>
					<li className="pos-r">
						会员权益
						<i className="pos-a fa fa-chevron-right"></i>
					</li>
					<li className="pos-r">
						我的账户
						<i className="pos-a fa fa-chevron-right"></i>
					</li>
				</ul>

				{/** 退出 */}
				<button className="inline-button orange">退出</button>
				
				<Footer />
			</div>
		);
	}
}

export default Profile;