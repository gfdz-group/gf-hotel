import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './common/Loading';
import FooterBtn from './common/footerBtn';

class HotelsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
    };
  }

  resetLocalStorage() {
    localStorage.setItem('order', null);
  }

  componentWillMount() {
    document.title = '景罕人家';
    this.resetLocalStorage()
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({hotels: res});
        /** cache hotel lists */
        localStorage.setItem('hotelLists', JSON.stringify(res));
      })
      .catch(err => { console.error(err); });
  }

  async callApi() {
    const res = await fetch('/api/hotel/hotelManager/getHotelInfoList.do',{
      method: 'GET',
      credentials: 'same-origin',
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      this.state.hotels.length?
      (
        <div className="hotelsList">
          <div className="container">
            <div className="gallery">
              {this.state.hotels.map((hotel, idx) => {
                return (
                  <div className="block" key={hotel.id}>
                    <Link className="pos-r" to={`/hotel/${hotel.id}`}>
                      <img src={hotel.faceImagePath} alt="" />
                      <h1 className="title">{hotel.hotelName}</h1>
                      <span className="sub-title"> {hotel.address}</span>
                      <div className="price-tag pos-a">
                        <span className="currency">¥</span>
                        <span className="price">{hotel.lowestPrice ? hotel.lowestPrice : 0}</span>
                        <span>起</span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <FooterBtn
            color="#FFF"
            bgColor="#20b176"
            text="我的订单"
            to={`/profile/order-list`}
          />
        </div>
      )
      : <Loading />
    )
  }
}

export default HotelsList;
