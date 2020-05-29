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
	<!-- svelte-ignore a11y-no-onchange -->
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
	@import 'navigation.scss';
</style>