import React, { Component } from 'react';
import FooterBtn from './common/footerBtn';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const hotels = JSON.parse(localStorage.getItem('hotelLists'));
    const hotelId = this.props.match.params.hotelId? this.props.match.params.hotelId: hotels[0].id;
    const order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};
    
    const curr = new Date();
    curr.setDate(curr.getDate()+1);

    this.state = {
      hotels,
      hotelId,
      order: {
        inDate: order.inDate || (new Date()).toISOString().substr(0,10),
        outDate: order.outDate || curr.toISOString().substr(0, 10),
        daysdiff: order.daysdiff || 1,
        roomsCount: order.roomsCount || 1,
        adultNumber: order.adultNumber || 1,
        childrenNumber: order.childrenNumber || 0,
      },
      handleChange: this.handleChange.bind(this),
    };
  }

  handleChange(field, value) {
    this.setState({[field]: value});
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('order', JSON.stringify(this.state.order));
  }

  daysDiff(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  componentDidMount() {
    document.title = '房间';
    this.updateLocalStorage();
  }

  componentWillUnmount() {
    this.updateLocalStorage();
  }

  render() {
    const { order } = this.state;
    return (
      <div className="cal">
        {/** 酒店地址选择 */}
        <div className="select-wrapper">
          <select
            className="pos"
            onChange={evt => {
              this.state.handleChange('hotelId', evt.target.value);
            }}
          >
            { this.state.hotels.map((h, idx) => {
              return (
                <option 
                  key={idx}
                  value={h.id}
                  selected={h.id===this.state.hotelId}
                >当前位置: {h.city} {h.hotelName}</option>
              );
            })}
          </select>
          <i className="fa fa-map-marker"></i>
        </div>
        {/** 入住时间选择 */}
        <div className="date-picker">
          <div className="in ta-c di-b">
            <label className="db">入住时间</label>
            <input
              type="date"
              className="date-picker-trigger"
              defaultValue={order.inDate}
              onChange={(evt) => {

                const inDate = evt.target.value;
                const outDate = order.outDate;

                this.state.handleChange('order', {
                  ...order,
                  inDate: evt.target.value,
                   daysdiff: this.daysDiff(
                    inDate,
                    outDate
                  ),
                });
              }}
             />
          </div>
          {/** divider */}
          <span className="fa fa-calendar ta-c"></span>
          {/** end of divider */}
          <div className="out ta-c di-b">
            <label className="db">退房日期</label>
            <input
              type="date"
              className="date-picker-trigger"
              defaultValue={order.outDate}
              onChange={(evt) => {
                const inDate = order.inDate;
                const outDate = evt.target.value;

                this.state.handleChange('order', {
                  ...order,
                  outDate: evt.target.value,
                  daysdiff: this.daysDiff(
                    inDate,
                    outDate,
                  )
                });
              }}
            />
          </div>
        </div>
        {/** 时间段提示 */}
        <div className="divider ta-c">
          共&nbsp;{order.daysdiff}&nbsp;晚
        </div>
        {/** 数量选择 */}
        <div className="number-picker">
          <label className="lbl-title">房间数量</label>
          <div className="picker">
            <span className="fa fa-minus-circle" onClick={() => {
              const count = order.roomsCount;
              if(count>1) {
                this.state.handleChange('order', {
                  ...order,
                  roomsCount: count-1,
                })
              }
            }}></span>
            <h1>{order.roomsCount}</h1>
            <span className="fa fa-plus-circle" onClick={() => {
              const count = order.roomsCount;
              this.state.handleChange('order', {
                ...order,
                roomsCount: count+1,
              });
            }}></span>
          </div>
        </div>
          <div>
              <div className="number-picker mt">
                  <label className="lbl-title">成人 (每间)</label>
                  <div className="picker">
                      <span className="fa fa-minus-circle" onClick={() => {
                          const num = order.adultNumber;
                          if(num>1) {
                              this.state.handleChange('order', {
                                  ...order,
                                  adultNumber: num-1,
                              });
                          }
                      }}></span>
                      <h1>{order.adultNumber}</h1>
                      <span className="fa fa-plus-circle" onClick={() => {
                          const num = order.adultNumber;
                          this.state.handleChange('order', {
                              ...order,
                              adultNumber: num+1,
                          });
                      }}></span>
                  </div>
              </div>
              <div className="number-picker">
                  <label className="lbl-title">儿童 (每间)</label>
                  <div className="picker">
                      <span className="fa fa-minus-circle" onClick={() => {
                          const num = order.childrenNumber;
                          if(num>0) {
                              this.state.handleChange('order', {
                                  ...order,
                                  childrenNumber: num-1,
                              });
                          }
                      }}></span>
                      <h1>{order.childrenNumber}</h1>
                      <span className="fa fa-plus-circle" onClick={() => {
                          const num = order.childrenNumber;
                          this.state.handleChange('order', {
                              ...order,
                              childrenNumber: num+1,
                          })
                      }}></span>
                  </div>
              </div>
          </div>


        <FooterBtn 
           color="#FFF"
           bgColor="#4b2b95"
           text="查找房间"
           to={`/rooms/${this.state.hotelId}`}
        />
      </div>
    );
  }
} 

export default Calendar;