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
          {/** login */}
          <div className="block ta-c">
            <span className="db">登录后预定可赚取更高积分</span>
            <button className="di-b">登录</button>
          </div>
          {/** 酒店信息 */}
          <div className="block">
            <h2 className="orange">丽江官房大酒店</h2>
            <ul className="room-info">
              <li>舒适单人客房</li>
              <li>入住/退房日期：04月09日 / 04月10日</li>
              <li>成人（每间）: 1</li>
              <li>12岁以下儿童（每间）: 0</li>
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
                  transColor={'#249cd3'}
                />
              </div>
            </div>
          </div>
          {/** 附加信息 */}
          <div className="block">
            <ul className="list">
              <li className="pos-r">
                附加项目 (可选择)
                <i className="pos-a fa fa-chevron-right"></i>
              </li>
              <li>
                抵达酒店时间
              </li>
              <li className="pos-r">
                备选要求 (可选择)
                <i className="pos-a fa fa-chevron-right"></i>
              </li>
            </ul>            
          </div>
          {/** 信用卡担保 */}
          <div className="block">
            <h2>信用卡担保</h2>
            <span>您所提供的信用卡信息将用于预定担保，预定时不会收取任何费用</span>
            <div className="list-wrapper">
              <span>信用卡类型</span>
              <ul style={{display: 'none'}}></ul>
            </div>
          </div>
          {/** 预定取消规定 */}
          <div className="block">
            <h2>预定取消规定</h2>
            <span>预定时或需使用信用卡投保。如于抵达当日16:00前24小时内（酒店当地时间）取消已担保预定，则需支付一晚房费。</span>
          </div>
          {/** 条款与细则 */}
          <div className="block">
            <h2>条款与细则</h2>
            <input type="checkbox" />
            <span>我已阅读并同意该<i className="orange">条款与细则、隐私保障政策</i>及<i className="orange">Cookies政策</i></span>
          </div>
          {/** 加入会员 */}
          <div className="block">
            <h2>加入会员</h2>
            <span>使用此次预定信息称谓会员，享受尊崇礼遇及奖励</span>
            <input type="checkbox"/>
            <span>我已阅读并同意该<i className="orange">条款与细则、隐私保障政策</i>及<i className="orange">Cookies政策</i></span>
          </div>
        </div>
        {/** 支付结算 */}
        <div className="footer no-border">
          <div>
            <span className="db red">￥480</span>
            <span className="db">已包含双早费及服务费</span>
          </div>
          <button>提交订房</button>
        </div>
      </div>
    );
  }
}

export default Order;