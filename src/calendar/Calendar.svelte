<script context="module">
	import { _setConfig } from './calendar.js';

	export function setConfig(config) {
		_setConfig(config)
	};

</script>

<script>
	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { getConfig, getMonths, addMonth, changeMonth, getLocalizationValues } from './calendar.js';
	import { merge } from '../util/config.js';
	import { normalize } from '../util/util.js';
	import { delegate, attr } from '../util/dom.js';

	import Navigation from './Navigation.svelte';
	import Month from './Month.svelte';

	const dispatch = createEventDispatcher();

	const config = getConfig();

	export let locale = config.locale;
	export let rows = config.rows;
	export let cols = config.cols;
	export let navigation = config.navigation;
	export let firstDayOfWeek = config.firstDayOfWeek;
	export let showWeekdays = config.showWeekdays;
	export let showWeekNumbers = config.showWeekNumbers;
	export let startDate = new Date();
	export let minDate = config.minDate;
	export let maxDate = config.maxDate;
	export let styles = [];
	/*
	export let outsideDays = config.outsideDays;
	*/

	startDate = new Date(startDate);
	startDate.setHours(12);

	const calendarStore = writable({});
	setContext('Calendar-context', {
		store: calendarStore,
		api: {
			previousMonth: () => {
				startDate = addMonth(startDate, -1);
			},
			nextMonth: () => {
				startDate = addMonth(startDate, 1);
			},
			changeMonth: (year, month) => {
				startDate = changeMonth(startDate, year, month);
			},
		}
	});

	$: $calendarStore.locales = getLocalizationValues(locale);
	$: months = getMonths(rows, cols, startDate);

	let date;
	let range = [];
	const onDayClick = delegate('[data-date]', function({target}) {
		const previousDate = date;
		date = attr(target, 'data-date');
		if (!previousDate) {
			range = [date, date];
		} else {
			range = previousDate < date ? [previousDate, date] : [date, previousDate];
		}

		dispatch('dateselect', {
			date,
			range
		});
	});

</script>
<div class="Calendar" on:click={onDayClick}>
	<div class="Calendar-header">
		<Navigation {navigation} {months} {minDate} {maxDate} />
	</div>
	{#each months as monthRows}
	<div class="Calendar-content Calendar-months d-flex">
		{#each monthRows as {month} (month)}
			<Month {month} {firstDayOfWeek} {showWeekdays} {showWeekNumbers} {styles} />
		{/each}
	</div>
	{/each}
</div>
<style type="text/scss">
	@import 'calendar.scss';
</style>