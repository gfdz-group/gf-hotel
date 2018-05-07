import React, { Component } from 'react';
import Header from './header';
import Banner from './common/bannerImage';
import FooterBtn from './common/footerBtn';

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      addr: '云南丽江香格里大道966号',
      postcode: '674100',
      desc: "官房大酒店（丽江旗店区）位于香格里拉大道南端黄金地段，北面与市政广场相连，东南八分钟步程即为世界文化遗产—丽江古城，南面紧连丽江繁华的商贸街；方圆2公里内，集中了工商银行总部、丽江市旅游局、丽江市海关总部、丽江市电信总部等一批市政、金融体系单位，形成了集旅游、商贸、金融信息民俗文化为一体的区位优势。\r\n官房大酒店（丽江花园别墅区）依托丽江官房大酒店国际五星级酒店管理平台，采用国内首创的“五星级管家式”服务模式与流程，成为云南省乃至国内首家独树一帜的个性化酒店。"
    };
  }
  componentDidMount() {
    document.title = '丽江官房大酒店';
  }
  render() {
    return (
      <div className="hotel">
        <Header title="丽江官房大酒店"></Header>
        <div className="container">
          {/** banner */}
          <div className="block no-p">
            <Banner image="/assets/u5.jpg" />
            {/** 酒店位置 */}
            <div className="text pos-r">
              {this.state.addr} 邮政编码:{this.state.postcode}
              <i className="fa fa-map-marker pos-a"></i>
            </div>
          </div>
          {/** 酒店介绍 */}
          <div className="block">
            <h1>关于酒店</h1>
            <pre>{this.state.desc}</pre>
            <div className="link">
              <i className="fa fa-chevron-down"></i>
            </div>
          </div>
          {/** 设施服务 */}
          <div className="block">
            <h1>设施服务</h1>
            {/** 相册 */}
            <div className="gallery">
              <div style={{width: 650}}>
                <div className="block pos-r">
                  <img src="/assets/meet01.jpg" alt="" />
                  <div className="title pos-a ta-c">多功能厅</div>
                </div>
                <div className="block pos-r">
                  <img src="/assets/sports01.jpg" alt="" />
                  <div className="title pos-a ta-c">餐厅</div>
                </div>
                <div className="block pos-r">
                  <img src="/assets/swim.jpg" alt="" />
                  <div className="title pos-a ta-c">游泳池</div>
                </div>
                <div className="block pos-r">
                  <img src="/assets/meet02.jpg" alt="" />
                  <div className="title pos-a ta-c">会议室</div>
                </div>
                <div className="clear"></div>
              </div>
            </div>
            <ul className="list">
              <li className="list-item">
                <h1>
                  <i className="fa fa-wifi"></i>
                  网络
                </h1>
                <ul>
                  <li>客房WIFI免费</li>
                  <li>房间内高速上网</li>
                  <li>公用区WIFI免费</li>
                </ul>
              </li>
              <li className="list-item">
                <h1>
                  <i className="fa fa-car"></i>
                  停车场
                </h1>
                <ul>
                  <li>收费停车场</li>
                </ul>
              </li>
              <li className="list-item">
                <h1>
                  <i className="fa fa-plane"></i>
                  交通服务
                </h1>
                <ul>
                  <li>接机服务</li>
                  <li>接站服务</li>
                  <li>叫车服务</li>
                </ul>
              </li>
              <li className="list-item">
                <h1>
                  <i className="fa fa-coffee"></i>
                  休闲娱乐
                </h1>
                <ul>
                  <li>室内游泳池</li>
                  <li>健身室</li>
                  <li>按摩室</li>
                  <li>桑拿浴室</li>
                  <li>乒乓球室</li>
                  <li>桌球室</li>
                  <li>棋牌室</li>
                  <li>茶室</li>
                </ul>
              </li>
            </ul>
          </div>
          {/** 酒店政策 */}
          <div className="block">
            <h1>酒店政策</h1>
            <ul className="list">
              <li className="list-item">
                <h1>
                  <i className="fa fa-clock-o"></i>
                  入离时间
                  <p className="no-m">
                    入店时间：14:00以后
                    离店时间: 次日12:00以前
                  </p>
                </h1>
              </li>
              <li className="list-item">
                <h1>
                  <i className="fa fa-list"></i>
                  儿童政策及加床政策
                </h1>
                <ul className="vertical">
                  <li>酒店允许携带儿童入住</li>
                  <li>不接受18岁以下客人在无监护人陪同的情况下入住</li>
                  <li>加床政策、儿童人数请参见您选定的客房政策，若超过房型限定人数，可能需收取额外费用。提出的任何要求均需获得酒店的确认，所有服务详情以酒店的告知为准。</li>
                  <li>膳食安排: 中式早餐 RMB 68</li>
                  <li>宠物: 不可携带宠物。</li>
                </ul>
              </li>
            </ul>
          </div>
          <FooterBtn
            color="#FFF"
            bgColor="#79522a"
            text="我要订房"
            to={`/calendar/${this.state.id}`}
          />
        </div>
      </div>
    );
  }
}

export default Hotel;