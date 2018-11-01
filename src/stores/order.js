import { store } from 'react-easy-state';

const curr = new Date();
curr.setDate(curr.getDate()+1);

const order = store({
  list: [],
  inDate: new Date(),
  outDate: curr,
  daysDiff: 1,
  roomsCount: 1,
  adultNumber: 1,
  childrenNumber: 0,
  update (field, value) {
    order[field] = value;
  }
});

export default order;
