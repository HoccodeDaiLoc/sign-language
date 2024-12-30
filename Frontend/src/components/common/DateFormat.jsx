import { formatDate } from '../../utils/timeUtils';

const DateFormat = ({ dateString }) => {
    return <span>{formatDate(dateString)}</span>;
};

export default DateFormat;