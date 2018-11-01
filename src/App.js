import React, { Component } from 'react';
import { Route } from "react-router-dom";
import {
  HotelsList,
  Hotel,
  Calendar,
  Order,
  OrderList,
  Profile,
  RoomsList,
  RoomDetail,
  DatePicker,
} from './components';
import './styles/index.less';

import withAuth from './components/auth/withAuth';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={withAuth(HotelsList)} />
        <Route exact path="/hotel/:hotelId" component={Hotel} />
        <Route path="/calendar/:hotelId?" component={Calendar} />
        <Route path="/date-picker" component={DatePicker} />
        <Route exact path="/rooms/:hotelId" component={RoomsList} />
        <Route exact path="/room/:roomId" component={RoomDetail} />
        <Route exact path="/order/:roomId" component={Order} />
        <Route exact path="/orders" component={OrderList} />
        <Route exact path="/profile" component={Profile} />
      </div>
    );
  }
}

export default App;
