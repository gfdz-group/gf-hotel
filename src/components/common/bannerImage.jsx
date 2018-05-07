import React, { Component } from 'react';

class BannerImage extends Component{
  render() {
    const { image, alt } = this.props;
   return (
      <div className="banner">
        <img src={image} alt={alt} />
      </div>
   );
  }
}

export default BannerImage;


