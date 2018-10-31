import { store } from 'react-easy-state';

const hotels = store({
  all: [],
  create (list) {
    hotels.all = list;
  }
});

export default hotels;
