import { padZero } from './calendar.js';
import { capitalize } from '@sveltrap/util/util.js';

export function getData(months) {
	const lastRow = months.length - 1;
	const lastCol = months[0].length - 1;
	const firstMonth = months[0][0].month;
	const lastMonth = months[lastRow][lastCol].month;
	const [yearSelect, monthSelect] = firstMonth.split('-');

	return {firstMonth, lastMonth, yearSelect, monthSelect};
}

export function getRangeData(minDate, maxDate) {
	return {
		minMonth: minDate ? minDate.substring(0, 7) : '0',
		maxMonth: maxDate ? maxDate.substring(0, 7) : '9',
	};
}

export function getMonthsOptions(monthsLocales) {
	const monthsOptions = [];
	const monthsShort = monthsLocales.short;
	const monthsLong = monthsLocales.long;
	for(let i = 0; i < monthsShort.length; i++) {
		monthsOptions.push({
			index: padZero(i + 1),
			short: capitalize(monthsShort[i]),
			long: capitalize(monthsLong[i]),
		});
	}

	return monthsOptions;

}

function getDate(str) {
	return str ? new Date(str) : new Date();
}

export function getYearsOptions(minDate, maxDate) {
	const refMinDate = getDate(minDate);
	if (!minDate) {
		refMinDate.setFullYear(refMinDate.getFullYear() - 10);
	}
	const refMaxDate = getDate(maxDate);
	if (!maxDate) {
		refMaxDate.setFullYear(refMaxDate.getFullYear() + 10);
	}

	const minYear = refMinDate.getFullYear();
	const maxYear = refMaxDate.getFullYear();
	const options = [];
	for(let year = minYear; year <= maxYear; year++) {
		options.push('' + year);
	}

	return options;
}