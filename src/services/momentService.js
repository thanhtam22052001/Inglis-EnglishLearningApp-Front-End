import moment from 'moment';
export const getHoursFromNow = startTime => {
  return moment(new Date()).diff(moment(startTime), 'hours');
};

export const getAgo = date => {
  let value = getHoursFromNow(date);
  let unit = 'Just now';
  switch (true) {
    case value < 1:
      value = '';
      unit = 'Just now';
      break;
    case 24 - 1 > value && value >= 1:
      value = value;
      unit = 'hours';
      break;
    case 24 * 7 - 1 > value && value >= 24:
      value = Math.round(value / 24);
      unit = 'days';
      break;
    case 24 * 31 - 1 > value && value >= 24 * 7:
      value = Math.round(value / (24 * 7));
      unit = 'weeks';
      break;
    case 24 * 365 - 1 > value && value >= 24 * 31:
      value = Math.round(value / (24 * 31));
      unit = 'months';
      break;
    case value >= 24 * 365:
      value = Math.round(value / (24 * 365));
      unit = 'years';
      break;
  }
  return unit === 'Just now'
    ? unit
    : `${value} ${value > 1 ? unit : unit.slice(0, -1)} ago`;
};
