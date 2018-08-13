import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import utils from '../../utils'

class HotelCommentBanner extends Component {
  constructor() {
    super()
    const order = localStorage.getItem('order') && JSON.parse(localStorage.getItem('order'));
    const curr = new Date();
    curr.setDate(curr.getDate()+1);
    this.state = {
      inDateShow: order && order.inDateShow ? order.inDateShow : utils.dateFormat(new Date()),
      outDateShow: order && order.outDateShow ? order.outDateShow : utils.dateFormat(curr),
      daysDiff: order && order.daysDiff ? order.daysDiff : 1,
    }
  }

  render() {
    return (
      <div className="hotel-comment-banner">
        <div>
          {/** score */}
          <div className="score">
            <span>4.6分</span>
            <div className="comment">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </div>
              <span>4条评论</span>
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
          {/** in/out */}
          <div className="date-time">
            <div>
              <span>入住</span>
              <span>{this.state.inDateShow}</span>
            </div>
            <div>
              <span>离店</span>
              <span>{this.state.outDateShow}</span>
            </div>
          </div>
          {/** days diff */}
          <Link to="/date-picker">
            <div className="days-diff">
              <span>共 {this.state.daysDiff} 晚</span>
              <i className="fa fa-angle-right"></i>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default HotelCommentBanner
