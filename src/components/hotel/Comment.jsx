import React, { Component } from 'react'

class HotelCommentBanner extends Component {
  constructor() {
    super()
    this.state = {

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
              <span>07/31</span>
            </div>
            <div>
              <span>离店</span>
              <span>08/01</span>
            </div>
          </div>
          {/** days diff */}
          <div className="days-diff">
            <span>共 1 晚</span>
            <i className="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default HotelCommentBanner
