import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import order from '../../stores/order';
import utils from '../../utils';

class HotelCommentBanner extends Component {

  render() {
    const { inDate, outDate, daysDiff } = order;
    const inDateShow = utils.dateFormat(inDate);
    const outDateShow = utils.dateFormat(outDate);

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
              <span>{inDateShow}</span>
            </div>
            <div>
              <span>离店</span>
              <span>{outDateShow}</span>
            </div>
          </div>
          {/** days diff */}
          <Link to="/date-picker">
            <div className="days-diff">
              <span>共 {daysDiff} 晚</span>
              <i className="fa fa-angle-right"></i>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default HotelCommentBanner
