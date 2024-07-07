import moment from 'moment';

const formatDate = timestamp => {
  const date = moment(timestamp);
  const now = moment();

  if (date.isSame(now, 'day')) {
    return 'Today';
  } else if (date.isSame(now.subtract(1, 'days'), 'day')) {
    return 'Yesterday';
  } else {
    return date.format('MMMM D, YYYY');
  }
};

export default formatDate;
