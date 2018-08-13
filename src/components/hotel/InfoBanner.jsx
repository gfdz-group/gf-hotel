import React, { Component } from 'react'

class HotelInfoBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.hotel.hotelName,
      address: props.hotel.hotelAddress
    }
  }

  render() {
    const { name, address } = this.state
    return (
      <div className="hotel-info-banner">
        <div>
          <span className="name">{name}</span>
          <div className="address">
            <i className="fa fa-map-marker"></i>
            {address}
            <i className="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default HotelInfoBanner
