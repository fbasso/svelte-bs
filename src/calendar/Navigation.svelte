<script>
	import { getContext } from 'svelte';
	import { getData, getRangeData, getMonthsOptions, getYearsOptions } from './navigation.js';

	export let navigation;
	export let months;
	export let minDate;
	export let maxDate;

	const {api, store} = getContext('Calendar-context');

	$: monthsShort = $store.locales.monthsShort;
	$: monthsLong = $store.locales.monthsLong;
	$: ({firstMonth, lastMonth, yearSelect, monthSelect} = getData(months));
	$: ({minMonth, maxMonth} = getRangeData(minDate, maxDate));
	$: hasSelect = navigation === 'select';
	$: hasArrows = navigation !== 'none';
	$: monthsOptions = hasSelect ? getMonthsOptions($store.locales.months) : [];
	$: yearsOptions = hasSelect ? getYearsOptions(minDate, maxDate) : [];

	function changeMonth() {
		api.changeMonth(yearSelect, monthSelect);
	}

</script>
<div class="Calendar-navigation" class:position-absolute={!hasSelect}>
	{#if hasArrows && firstMonth > minMonth}
	<div class="Calendar-arrow"><button type="button" class="btn btn-link Calendar-arrow-btn p-0 ml-2" aria-label="Previous month" title="Previous month" on:click={api.previousMonth}><span class="Calendar-navigation-chevron"></span></button></div>
	{/if}
	{#if hasSelect}
	<div class="Calendar-navigation-select">
		<select bind:value={monthSelect} class="custom-select mr-2" aria-label="Select month" title="Select month" on:change={changeMonth}>
			{#each monthsOptions as {index, short, long} (index)}
			<option value={index} aria-label={long}>{short}</option>
			{/each}
		</select>
		<select bind:value={yearSelect} class="custom-select" aria-label="Select year" title="Select year" on:change={changeMonth}>
			{#each yearsOptions as year (year)}
			<option value={year}>{year}</option>
			{/each}
		</select>
	</div>
	{/if}
	{#if hasArrows && lastMonth < maxMonth}
	<div class="Calendar-arrow right"><button type="button" class="btn btn-link Calendar-arrow-btn p-0 mr-2" aria-label="Next month" title="Next month" on:click={api.nextMonth}><span class="Calendar-navigation-chevron"></span></button></div>
	{/if}
</div>
<style type="text/scss">
	:global(.Calendar-navigation) {
		display: flex;
		align-items: center;
		left: 0;
		right: 0;
	}

	:global(.Calendar) {
		&-navigation-chevron {
			border-style: solid;
			border-width: 0.2em 0.2em 0 0;
			display: inline-block;
			width: 0.75em;
			height: 0.75em;
			margin-left: 0.25em;
			margin-right: 0.15em;
			transform: rotate(-135deg);
		}

		.right &-navigation-chevron {
			transform: rotate(45deg);
			margin-left: 0.15em;
			margin-right: 0.25em;
		}

		&-arrow {
			display: flex;
			flex: 1 1 auto;
			padding-right: 0;
			padding-left: 0;
			margin: 0;
			width: 2rem;
			height: 2rem;

			&.right {
				justify-content: flex-end;
			}

		}

		&-arrow-btn {
			padding: 0 0.25rem;
			margin: 0 0.5rem;
			border: none;
			background-color: transparent;
			z-index: 1;

			&:focus {
				outline-width: 1px;
				outline-style: auto;
			}

			// IE workaround, as outline-style: auto doesn't work
			@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
				&:focus {
					outline-style: solid;
				}
			}
		}

		&-month-name {
			font-size: larger;
			height: 2rem;
			line-height: 2rem;
			text-align: center;
		}

		&-navigation-select {
			display: flex;
			// flex: 1 1 9rem;
		}
	}

	:global(.Calendar-navigation-select) {
		> .custom-select {
			width: 8rem;
			flex: 1 1 auto;
			padding: 0 0.5rem;
			font-size: 0.875rem;
			height: 1.85rem;

			&:focus {
				z-index: 1;
			}

			// IE11, Edge: Fix arrow icon disappears on focus
			&::-ms-value {
				background-color: transparent !important;
			}
		}
	}
</style>