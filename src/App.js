import React from 'react';
import URI from 'urijs';
import {
  Route,
  /**Redirect*/
} from "react-router-dom";
import {
  HotelsList,
  Hotel,
  //HouseLayout,
  Calendar,
  Order,
  Profile,
  RoomsList,
  RoomDetail,
  DatePicker,
} from './components';
import './styles/index.less';

const APP_ID = 'wxa8cb00b7504df771';

const requireAuth = (Component) => {
  return class HOC extends Component {

    generateGetCodeUrl(redirectURL) {
      return new URI('https://open.weixin.qq.com/connect/oauth2/authorize')
        .addQuery("appid", APP_ID)
        .addQuery("redirect_uri", redirectURL)
        .addQuery("response_type", "code")
        .addQuery("scope", "snsapi_base")
        .addQuery("response_type", "code")
        .hash("wechat_redirect")
        .toString();
    }

    async callApi(code) {
      if (Boolean(code)) {
        const res = await fetch(`/api/hotel/hotelManager/getOpenId.do?code=${code}`, {
          method: 'GET',
          credentials: 'same-origin',
        });
        const body = await res.json();
        console.log(res);
        return body;
      }
    }

    componentWillMount() {
      const openId = localStorage.getItem('openId');

      //   if (!openId) {
      //     const uri = new URI(document.location.href);
      //     const query = uri.query(true);
      //     const {
      //       code
      //     } = query;
      //     if (!Boolean(code)) {
      //       document.location = this.generateGetCodeUrl(document.location.href);
      //     } else {
      //       this.callApi(code)
      //         .then(res => {
      //           localStorage.setItem('openId', res.openId);
      //         })
      //         .catch(err => { /** error handle */ });
      //     }
      //   }
    }

    render() {
      return <Component {...this.props}/>
    }
  }
}


const App = () => {
  return (
    <div>
      <Route exact path="/" component={requireAuth(HotelsList)} />
      <Route exact path="/hotel/:hotelId" component={Hotel} />
      <Route path="/calendar/:hotelId?" component={Calendar} />
      <Route path="/date-picker" component={DatePicker} />
      <Route exact path="/rooms/:hotelId" component={RoomsList} />
      <Route exact path="/room/:roomId" component={RoomDetail} />
      {/**<Route exact path="/layouts/:hotel_id" component={HouseLayout} />*/}
      <Route exact path="/order/:roomId" component={Order} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );
};

export default App;
