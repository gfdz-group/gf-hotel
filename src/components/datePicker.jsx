import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import utils from '../utils'
import 'react-day-picker/lib/style.css';

const MONTHS = [
  '1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月'
]

const WEEKDAYS_SHORT = ['日', '一', '二', '三', '四', '五', '六'];

class DatePicker extends Component {
  constructor() {
    super()
    this.state = {
      from: undefined,
      to: undefined,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  updateLocalStorage(order) {
    localStorage.setItem('order', JSON.stringify(order));
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  componentDidMount() {
    if(localStorage.getItem('order')) {
      const order = JSON.parse(localStorage.getItem('order'));
      this.setState({ from: new Date(order.inDate), to: new Date(order.outDate) });
    }
  }

  componentWillUnmount() {
    const { from, to } = this.state;
    let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};
    order.inDate = from;
    order.inDateShow = utils.dateFormat(from);
    order.outDate = to;
    order.outDateShow = utils.dateFormat(to);
    this.updateLocalStorage(order);
  }

  render() {
    const { from, to } = this.state
    const modifiers = { start: from, end: to };
    return (
      <div className="date-table-picker">
        <DayPicker
          className="Selectable"
          months={MONTHS}
          weekdaysShort={WEEKDAYS_SHORT}
          firstDayOfWeek={0}
          canChangeMonth={false}
          numberOfMonths={3}
          disabledDays={[
            { before: new Date() }
          ]}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    )
  }
}

export default DatePicker
