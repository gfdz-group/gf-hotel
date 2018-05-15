import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import {
  HotelsList,
  Hotel,
  //HouseLayout,
  Calendar,
  Order,
  Profile,
  RoomsList,
  RoomDetail
} from './components';
import './styles/index.less';

const App = () => {
  return (
    <div>
      <Redirect from="/" to="/hotels" />
      <Route exact path="/hotels" component={HotelsList} />
      <Route exact path="/hotel/:hotelId" component={Hotel} />
      <Route path="/calendar/:hotelId?" component={Calendar} />
      <Route exact path="/rooms/:hotelId" component={RoomsList} />
      <Route exact path="/room/:roomId" component={RoomDetail} />
      {/**<Route exact path="/layouts/:hotel_id" component={HouseLayout} />*/}
      <Route exact path="/order/:roomId" component={Order} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );
};

export default App;