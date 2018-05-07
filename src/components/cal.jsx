import React, { Component } from 'react';
import FooterBtn from './common/footerBtn';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [
        { 
          hotel_id: 1, 
          hotel_name: '官房大酒店 (旗舰店)',
          city: '丽江市',
        },
        {
          hotel_id: 2,
          hotel_name: '官房大酒店',
          city: '昆明市',
        },
      ]
    };
  } 

  componentDidMount() {
    document.title = '房间';
  }

  render() {
    return (
      <div className="cal">
        {/** 酒店地址选择 */}
        <div className="select-wrapper">
          <select className="pos">
            { this.state.hotels.map((h, idx) => {
              return (
                <option key={idx} value={h.hotel_id}>当前位置: {h.city} {h.hotel_name}</option>
              );
            })}
          </select>
          <i className="fa fa-caret-down"></i>
        </div>
        {/** 入住时间选择 */}
        <div className="date-picker">
          <div className="in ta-c di-b">
            <label className="db">入住时间</label>
            <span className="date-picker-trigger">04/28</span>
          </div>
          {/** divider */}
          <span className="fa fa-calendar ta-c"></span>
          {/** end of divider */}
          <div className="out ta-c di-b">
            <label className="db">退房日期</label>
            <span className="date-picker-trigger">05/1</span>
          </div>
        </div>
        {/** 时间段提示 */}
        <div className="divider ta-c">
          共3晚
        </div>
        {/** 数量选择 */}
        <div className="number-picker">
          <label>房间数量</label>
          <div className="picker">
            <span className="fa fa-minus-circle"></span>
            <h1>1</h1>
            <span className="fa fa-plus-circle"></span>
          </div>
        </div>
        <div className="number-picker mt">
          <label>成人 (每间)</label>
          <div className="picker">
          <span className="fa fa-minus-circle"></span>
            <h1>1</h1>
            <span className="fa fa-plus-circle"></span>
          </div>
        </div>
        <div className="number-picker">
          <label>儿童 (每间)</label>
          <div className="picker">
            <span className="fa fa-minus-circle"></span>
            <h1>0</h1>
            <span className="fa fa-plus-circle"></span>
          </div>
        </div>

        <FooterBtn 
           color="#FFF"
           bgColor="#79522a"
           text="查找房间"
           to={`/rooms/${this.state.hotels[0].hotel_id}`}
        />
      </div>
    );
  }
} 

export default Calendar;