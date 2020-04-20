<script>
	import { getContext } from 'svelte';
	import { calendarize, getFilteredStyles, getFormattedDays, getWeekdays, getMonthLabel } from './calendar.js';
	import Day from './Day.svelte';

	export let month;
	export let firstDayOfWeek;
	export let showWeekdays;
	export let styles;
	export let showWeekNumbers = false;

	const {store} = getContext('Calendar-context');

	$: filteredStyles = getFilteredStyles(month, styles);
	$: days = calendarize(month + '-01', firstDayOfWeek);
	$: formattedDays = getFormattedDays(days, month, filteredStyles);
	$: weekdays = getWeekdays($store.locales.weekdays.shorter, firstDayOfWeek);
	$: monthLabel = getMonthLabel($store.locales.months.long, month);

</script>
<div class="Calendar-month">
	<div class="Calendar-month-name">{monthLabel}</div>
	<div class="Calendar-month" role="grid">
		{#if showWeekdays}
		<div role="row" class="Calendar-week Calendar-weekdays">
			{#each weekdays as weekday}
			<div role="columnheader" class="Calendar-weekday small">{weekday}</div>
			{/each}
		</div>
		{/if}
		{#each formattedDays as week}
		<div role="row" class="Calendar-week">
			{#if showWeekNumbers}
			<div class="Calendar-week-number small text-muted">14</div>
			{/if}
			{#each week as {date, day, className} (date)}
			<Day {day} {month} {className} />
			{/each}
		</div>
		{/each}
	</div>
</div>
<style type="text/scss">
	@import 'month.scss';
</style>