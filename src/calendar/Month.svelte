<script>
	import { getContext } from 'svelte';
	import { calendarize, getFilteredStyles, getFormattedDays, getWeekdays, getMonthLabel } from './calendar.js';
	import Day from './Day.svelte';

	export let month;
	export let firstDayOfWeek;
	export let showWeekdays;
	export let styles;
	export let showWeekNumbers;

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
			<!-- <div class="Calendar-week-number small text-muted">14</div> -->
			{#each week as {date, day, className} (date)}
			<Day {day} {month} {className} />
			{/each}
		</div>
		{/each}
	</div>
</div>
<style type="text/scss">
	:global(.Calendar-month) {
		// pointer-events: none;
		display: block;

		&-name {
			font-size: larger;
			height: 2rem;
			line-height: 2rem;
			text-align: center;
			text-transform: capitalize;
			background-color: #f8f9fa;
			background-color: var(--light);
		}

		& + & {
			.Calendar-month-name, .Calendar-week {
				padding-left: 1rem;
			}
		}

		&:last-child .Calendar-week {
			padding-right: .25rem;
		}

		&:first-child .Calendar-week {
			padding-left: .25rem;
		}

		.Calendar-week:last-child {
			padding-bottom: .25rem;
		}
	}

	:global(.Calendar) {
		&-weekday,
		&-week-number {
			line-height: 2rem;
			text-align: center;
			font-style: italic;
		}
		&-weekday {
			text-transform: capitalize;
			color: #5bc0de;
			color: var(--info);
		}
		&-week {
			border-radius: 0.25rem;
			display: flex;
		}
		&-weekdays {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
			border-radius: 0;
			background-color: #f8f9fa;
			background-color: var(--light);
		}
		&-day,
		&-weekday,
		&-week-number {
			width: 2rem;
			height: 2rem;
		}
		&-day {
			cursor: pointer;

			&.disabled,
			&.hidden {
			cursor: default;
			pointer-events: none;
			}

			&[tabindex="0"] {
			z-index: 1;
			}
		}
	}
</style>