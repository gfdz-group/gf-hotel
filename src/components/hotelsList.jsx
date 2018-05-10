import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './common/Loading';
import Banner from './common/bannerImage';
import Header from './header';
import Footer from './footer';

class HotelsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
    };
  }

  componentWillMount() {
    document.title = '官房大酒店';
  }

  componentDidMount() {
    this.callApi()
      .then(res => { this.setState({hotels: res}); })
      .catch(err => { console.error(err); });
  }

  async callApi() {
    const res = await fetch('/api/hotel/hotelManager/getHotelInfoList.do');
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      this.state.hotels.length?
      (
        <div className="hotelsList">
          <Header title="品官房" />
          <div className="container">
            {/** banner image */}
            <Banner image="/assets/u65.jpg" />
            {/** list */}
            <div className="gallery">
              {this.state.hotels.map((hotel, idx) => {
                return (
                  <div className="block" key={idx}>
                    <Link to={`/hotel/${hotel.id}`}>
                      <img src={hotel.faceImagePath} alt="" />
                    </Link>
                  </div>
                );
              })}
            </div>
            {/** end of gallery */}
          </div>
          <Footer />
        </div>
      )
      : <Loading />
    )
  }
}

export default HotelsList;
