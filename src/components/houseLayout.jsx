import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import HouseLayoutItem from './houseLayout/layoutItem';

class HouseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: [
        {
          id: 1,
          name: '精致小套间',
          features: [
            '精致豪华小套间',
            '配备宽敞的起居室和独立的客用洗手间',
            '房间面积为70平方米/753平方英尺',
          ],
          packages: [
            {
              id: 1,
              name: '最优房价 / 自选包价（特大床)',
              price: 480,
              labels: ['无需预定','限时抢'],
              note: '价格已包含双早费及服'
            },
            {
              id: 2,
              name: '家庭欢乐入住套餐（特大床)',
              price: 680,
              labels: ['无需预定'],
              note: '价格已包含双早费及服'
            }
          ]
        },
        {
          id: 2,
          name: '精致小套间',
          features: [
            '精致豪华小套间',
            '配备宽敞的起居室和独立的客用洗手间',
            '房间面积为70平方米/753平方英尺',
          ],
          packages: [
            {
              id: 3,
              name: '最优房价 / 自选包价（特大床)',
              price: 480,
              labels: ['无需预定'],
              note: '价格已包含双早费及服'
            },
            {
              id: 4,
              name: '家庭欢乐入住套餐（特大床)',
              price: 680,
              labels: ['无需预定'],
              note: '价格已包含双早费及服'
            }
          ]
        },
        {
          id: 3,
          name: '精致小套间',
          features: [
            '精致豪华小套间',
            '配备宽敞的起居室和独立的客用洗手间',
            '房间面积为70平方米/753平方英尺',
          ],
          packages: [
            {
              id: 5,
              name: '最优房价 / 自选包价（特大床)',
              price: 480,
              labels: ['无需预定'],
              note: '价格已包含双早费及服'
            },
            {
              id: 6,
              name: '家庭欢乐入住套餐（特大床)',
              price: 680,
              labels: ['无需预定'],
              note: '价格已包含双早费及服'
            }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <div className="house-layout">
        <Header title="住酒店" />
        <div className="container">
          {/** position */}
          <div className="block">
            云南省丽江市
          </div>
          {/** row */}
          <div className="row">
            <div className="block col col-6">
              <span>入住</span>
              <span>三月/27日/周三</span>
            </div>
            <div className="block col col-6">
              <span>退房</span>
              <span>三月/27日/周四</span>
            </div>
          </div>
          <div className="divider ta-c">入住1晚</div>
          {/** row */}
          <div className="block row">
            <div className="col col-4 border">
              <span>客房</span>
              <span>1</span>
            </div>
            <div className="col col-4 border">
              <span>成人</span>
              <span>2</span>
            </div>
            <div className="col col-4">
              <span>儿童</span>
              <span>0</span>
            </div>
          </div>
          {/** row */}
          <div className="block">
            <span>您是出差吗?</span>
            <div className="row">
              <div className="col col-6 ta-c">
                <input type="radio" name="foo" />
                是
              </div>
              <div className="col col-6 ta-c">
                <input type="radio" name="foo" />
                否
              </div>
            </div>
          </div>
          {/** list */}
          <ul className="list">
            {this.state.layouts.map((la, idx) => {
              return <HouseLayoutItem {...la} key={idx} />
            })}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HouseLayout;