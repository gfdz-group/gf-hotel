import { store } from 'react-easy-state';

const hotels = store({
  all: [],
  get isEmpty() {
    return this.all.length === 0
  } ,
  create (list) {
    hotels.all = list;
  }
});

export default hotels;
