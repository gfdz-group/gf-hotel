import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from './common/bannerImage';
import Header from './header';
import Footer from './footer';

class HotelsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**  */
    };
  }
  componentDidMount() {
    document.title = '官房大酒店';
  }
  render() {
    return (
      <div className="hotelsList">
        <Header title="品官房" />
        <div className="container">
          {/** banner image */}
          <Banner image="/assets/u65.jpg" />
          {/** list */}
          <div className="gallery">
            <div className="block">
              <Link to="/hotel/1">
                <img src="/assets/u5.jpg" alt="" />
              </Link>
            </div>
            <div className="block">
              <Link to="/hotel/2">
                <img src="/assets/u01.jpg" alt="" />
              </Link>
            </div>
            <div className="block">
              <Link to="/hotel/3">
                <img src="/assets/u00.jpg" alt="" />
              </Link>
            </div>
            <div className="block">
              <Link to="/hotel/4">
                <img src="/assets/u02.jpg" alt="" />
              </Link>
            </div>
            <div className="block">
              <Link to="/hotel/4">
                <img src="/assets/u03.jpg" alt="" />
              </Link>
            </div>
            <div className="block">
              <Link to="/hotel/4">
                <img src="/assets/u04.jpg" alt="" />
              </Link>
            </div>
          </div>
          {/** end of gallery */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default HotelsList;
