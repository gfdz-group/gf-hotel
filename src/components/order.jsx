import React, { Component } from 'react';
import Header from './header';
import Switch from './common/switch';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    return (
      <div className="order">
        <Header title="预定" />
        <div className="container">
          {/** 酒店信息 */}
          <div className="block">
            <h2 className="orange">丽江官房大酒店</h2>
            <ul className="room-info">
              <li><span>舒适单人客房</span></li>
              <li><span>入住/退房日期：04月09日 / 04月10日&nbsp;&nbsp;共1晚</span></li>
              <li><span>成人（每间）: 1</span></li>
              <li><span>12岁以下儿童（每间）: 0</span></li>
            </ul>
            <div className="extra">
              <span className="di">房间数量: 1</span>
              <span className="di fr light-blue">编辑</span>
            </div>
          </div>
          {/** 联络信息 */}
          <div className="block">
            <h2>联络信息</h2>
            <input className="db" type="text" placeholder="姓， 请用中文、英文或拼音填写" />
            <input className="db" type="text" placeholder="名， 请用中文、英文或拼音填写" />
            <input className="db" type="text" placeholder="手机号码" />
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
                <i className="pos-a">选择时间</i>
              </li>
              <li className="pos-r">
                  备选要求<span>无</span>
                  <i className="pos-a fa fa-chevron-right"></i>
              </li>
              <li className="pos-r no-border">
                发票<span>请到前台索取发票</span>
              </li>
            </ul>            
          </div>
          {/** 支付结算 */}
          <div className="footer no-border">
            <div>
                微信会员价 <span className="red">￥480</span>
              {/*<span className="db">已包含双早费及服务费</span>*/}
            </div>
            <button>提交订房</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;