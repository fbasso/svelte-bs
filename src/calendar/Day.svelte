<script lang="ts">
	export let day;
	export let month;
	export let className = '';

	let label, date, isValid;
	$: if (day) {
			label = month + '-' + day;
			date = month + '-' + (day < 10 ? '0' : '') + day;
			isValid = true;
		} else {
			label = '';
			date = '';
			isValid = false;
		}
</script>
<!-- <div role="gridcell" class="Calendar-day disabled hidden" tabindex="-1" aria-label="Monday, March 30, 2020">30 -->
<div role="gridcell" class="Calendar-day {className || ''}" class:Calendar-day-active={isValid} data-date={date}>
	{#if isValid}
		<button class="btn btn-day" tabindex="-1" aria-label={label}>{day}</button>
	{/if}
</div>

<style lang="scss">
	@import './day.scss';
</style>