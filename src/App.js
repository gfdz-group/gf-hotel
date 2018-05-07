import React from 'react';
import { Route, Redirect } from "react-router-dom";
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
      <Route exact path="/hotel/:hotel_id" component={Hotel} />
      <Route exact path="/calendar/:hotel_id" component={Calendar} />
      {/**<Route exact path="/layouts/:hotel_id" component={HouseLayout} />*/}
      <Route exact path="/order/:package_id" component={Order} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/rooms/:hotel_id" component={RoomsList} />
      <Route exact path="/room/:room_id" component={RoomDetail} />
    </div>
  );
};

export default App;
