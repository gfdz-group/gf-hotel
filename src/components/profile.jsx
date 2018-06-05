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
				<div className="level">
					<div class="shade"></div>
				</div>
                <div className="pro-head"> </div>
				<div className="pro-info">
					<div className="info-row">
						<div>会员号</div>
						<div>等级</div>
						<div>积分</div>
                    </div>
					<div className="info-row">
						<div>hy1298038</div>
						<div>白金会员</div>
						<div>666分</div>
                    </div>
                </div>
				{/** 列表 */}
				<div>
					<ul>
						<li className="pos-r">
							我的交易记录
							<i className="pos-a fa fa-angle-right"></i>
						</li>
						<li className="pos-r">
							兑换成员名单
							<i className="pos-a fa fa-angle-right"></i>
						</li>
					</ul>

					<ul>
						<li className="pos-r">
							我的资料
							<i className="pos-a fa fa-angle-right"></i>
						</li>
						<li className="pos-r">
							会员权益
							<i className="pos-a fa fa-angle-right"></i>
						</li>
						<li className="pos-r">
							我的账户
							<i className="pos-a fa fa-angle-right"></i>
						</li>
					</ul>
                </div>

                {/** 退出 */}
                {/*<button className="inline-button orange">退出</button>*/}
				
				<Footer />
			</div>
		);
	}
}

export default Profile;