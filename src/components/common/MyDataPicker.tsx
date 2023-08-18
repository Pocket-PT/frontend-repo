import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const MyDataPicker = () => <DatePicker onChange={onChange} picker="month" />;

export default MyDataPicker;
