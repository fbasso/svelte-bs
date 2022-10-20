<script context="module" lang="ts">
	import {qsa} from '#sveltrap/util/dom'
	import {_setConfig} from './calendar';

	export function setConfig(config) {
		_setConfig(config)
	};

</script>

<script lang="ts">
	/**
	 * @template T
	 * @typedef {import('@amadeus-it-group/tansu').Writable<T>} Writable
	 */
	import {setContext, createEventDispatcher} from 'svelte';
	import {writable} from '@amadeus-it-group/tansu';
	import {getConfig, getMonths, addMonth, changeMonth, getLocalizationValues} from './calendar';
	import {delegate, attr} from '../util/dom';

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
	// export let showWeekNumbers = config.showWeekNumbers;
	/** @type {string | Date}*/
	export let startDate = new Date();
	export let minDate = config.minDate;
	export let maxDate = config.maxDate;
	export let styles = [];


	let containerElement;
	export function getEdgeDates() {
		const attrName = 'data-date';
		const dayElements = qsa(containerElement, 'div.Calendar-day-active');
		return {
			startDate: attr(dayElements[0], attrName),
			endDate: attr(dayElements[dayElements.length - 1], attrName),
		}
	}

	/*
	export let outsideDays = config.outsideDays;
	*/

	startDate = new Date(startDate);
	startDate.setHours(12);

	/**
	 * @type {Writable<{locales?}>}
	 */
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
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="Calendar" on:click={onDayClick}>
	<div class="Calendar-header">
		<Navigation {navigation} {months} {minDate} {maxDate} />
	</div>
	{#each months as monthRows}
	<div bind:this={containerElement} class="Calendar-content Calendar-months d-flex">
		{#each monthRows as {month} (month)}
			<Month {month} {firstDayOfWeek} {showWeekdays} {styles} />
		{/each}
	</div>
	{/each}
</div>
<style lang="scss">
	@import './calendar.scss';
</style>