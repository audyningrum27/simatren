import moment from 'moment-timezone';
import 'moment/locale/id';

moment.locale('id');

export function formatMonth(dateString) {
    return moment.tz(dateString, 'Asia/Jakarta').format('MMMM');
}

export function formatDate(dateString) {
    return moment.tz(dateString, 'Asia/Jakarta').format('DD/MM/YYYY');
}
