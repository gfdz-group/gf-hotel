import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import order from '../stores/order';
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
      from: order.inDate,
      to: order.outDate,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  componentDidMount() {
    document.title = '日期选择';
  }

  componentWillUnmount() {
    const { from, to } = this.state;
    order.update('inDate', from);
    order.update('outDate', to);
    order.update('daysDiff',  utils.daysDiff(from, to));
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
