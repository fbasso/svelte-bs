import { initConfig, setConfig as setConfigUtil, getConfig as getConfigUtil } from '../util/config.js';

// Config functions
const CONFIG_NAME = 'Calendar-config';

initConfig(CONFIG_NAME, {

    // "select" - select boxes for month and navigation arrows
    // "arrows" - only navigation arrows
    // "none" - no navigation visible at all
	navigation: 'select',

	locale: 'en-GB',

	// Number of columns of the calendar
	cols: 1,

	// Number of rows of the calendar
	rows: 1,

	// First day of the week, sunday = 0
	firstDayOfWeek: 1,

	showWeekdays: true,
});

export function _setConfig(config) {
	setConfigUtil(CONFIG_NAME, config);
}

export function getConfig() {
	return getConfigUtil(CONFIG_NAME);
}
// End config

const weekdayDateList = [
	new Date('2020-01-05'),
	new Date('2020-01-06'),
	new Date('2020-01-07'),
	new Date('2020-01-08'),
	new Date('2020-01-09'),
	new Date('2020-01-10'),
	new Date('2020-01-11'),
];
const monthDateList = [
	new Date('2020-01-01'),
	new Date('2020-02-01'),
	new Date('2020-03-01'),
	new Date('2020-04-01'),
	new Date('2020-05-01'),
	new Date('2020-06-01'),
	new Date('2020-07-01'),
	new Date('2020-08-01'),
	new Date('2020-09-01'),
	new Date('2020-10-01'),
	new Date('2020-11-01'),
	new Date('2020-12-01'),
];

const locales = {};

export function getLocalizationValues(locale) {

	let calendarLocales = locales[locale];
	if (!calendarLocales) {
		const narrowWeekFormatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
		const shortWeekFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
		const longWeekFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
		const narrowMonthFormatter = new Intl.DateTimeFormat(locale, { month: 'narrow' });
		const shortMonthFormatter = new Intl.DateTimeFormat(locale, { month: 'short' });
		const longMonthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });

		calendarLocales = locales[locale] = {};
		const weekdays = calendarLocales.weekdays = {
			narrow: [],
			shorter: [],
			short: [],
			long: [],
		};

		const weekdaysNarrow = weekdays.narrow;
		const weekdaysShort = weekdays.short;
		const weekdaysShorter = weekdays.shorter;
		const weekdaysLong = weekdays.long;
		for(const date of weekdayDateList) {
			const shortWeekday = shortWeekFormatter.format(date);
			weekdaysNarrow.push(narrowWeekFormatter.format(date));
			weekdaysShorter.push(shortWeekday.substr(0, 2));
			weekdaysShort.push(shortWeekday);
			weekdaysLong.push(longWeekFormatter.format(date));
		}

		const months = calendarLocales.months = {
			narrow: [],
			short: [],
			long: [],
		};
		const monthsNarrow = months.narrow;
		const monthsShort = months.short;
		const monthsLong = months.long;
		for(const date of monthDateList) {
			monthsNarrow.push(narrowMonthFormatter.format(date));
			monthsShort.push(shortMonthFormatter.format(date));
			monthsLong.push(longMonthFormatter.format(date));
		}
	}
	return calendarLocales;
}

export function getMonths(rows, cols, date) {
	const currentDate = new Date(date);
	currentDate.setDate(15);

	const months = [];
	for(let i = 0; i < rows; i++) {
		const monthsRow = [];
		months.push(monthsRow);
		for(let j = 0; j < cols; j++) {
			monthsRow.push({
				month: currentDate.toISOString().substr(0, 7)
			});
			currentDate.setMonth(currentDate.getMonth() + 1);
		}
	}
	return months;
}


// From https://github.com/lukeed/calendarize
export function calendarize(target, offset) {
	let i = 0;
	let j = 0;
	let week;
	const out = [];
	const date = new Date(target || new Date);
	var year = date.getFullYear(), month = date.getMonth();

	// day index (of week) for 1st of month
	var first = new Date(year, month, 1 - (offset | 0)).getDay();

	// how many days there are in this month
	var days = new Date(year, month + 1, 0).getDate();

	while (i < days) {
		for(j = 0, week = Array(7); j < 7;) {
			while (j < first) week[j++] = 0;
			week[j++] = ++i > days ? 0 : i;
			first = 0;
		}
		out.push(week);
	}

	return out;
}

export function padZero(i) {
	return (i < 10 ? '0' : '') + i;
}

export function getFilteredStyles(month, styles) {
	const startMonth = month + '-01';
	const endMonth = month + '-32'; // No need to have the real last day

	const filteredStyles = [];
	for(const style of styles) {
		const {date1, date2} = style;
		if (
			(!date1 || (date1 && date1 <= endMonth)) &&
			(!date2 || (date2 && date2 >= startMonth))
		) {
			filteredStyles.push(style);
		}
	}
	return filteredStyles;
}

function getClassName(date, styles) {
	for(let i = styles.length - 1; i >= 0; i--) {
		const style = styles[i];
		const {date1, date2} = style;
		if (
			(!date1 || date >= date1) &&
			(!date2 || date <= date2)
		) {
			if (style.classStart && date === date1) {
				return style.classStart;
			}
			if (style.classEnd && date === date2) {
				return style.classEnd;
			}
			return style.className;
		}
	}
	return '';
}

export function getFormattedDays(days, month, styles) {
	const formattedDays = [];
	let index = -1;
	for(const week of days) {
		const formattedWeek = [];
		formattedDays.push(formattedWeek);
		for(const day of week) {
			index++;
			let item;
			if (day === 0) {
				item = {
					date: 'noday-' + index,
					day: '',
				};
			} else {
				const date = month + '-' + (day < 10 ? '0' : '') + day;
				item = {
					date,
					day: '' + day,
					className: getClassName(date, styles)
				};
			}
			formattedWeek.push(item);
		}
	}
	return formattedDays;

}

export function addMonth(date, offset) {
	const newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + offset);

	return newDate;
}

export function changeMonth(date, year, month) {
	const newDate = new Date(date);
	newDate.setFullYear(+year);
	newDate.setMonth(+month - 1);

	return newDate;
}

export function getWeekdays(weekdays, offset) {
	if (!offset) {
		return;
	}
	const rotated = [...weekdays];
	const firstElements = rotated.splice(0, offset);
	rotated.push(...firstElements);

	return rotated;
}

export function getMonthLabel(monthLabels, month) {
	const parts = month.split('-');
	const monthIndex = +(parts[1]) - 1;
	return monthLabels[monthIndex] + ' ' + parts[0];
}