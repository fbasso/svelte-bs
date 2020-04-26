<script>
	export let day;
	export let month;
	export let className = '';

	const label = month + '-' + day;
	const date = month + '-' + (day < 10 ? '0' : '') + day;
</script>
<!-- <div role="gridcell" class="Calendar-day disabled hidden" tabindex="-1" aria-label="Monday, March 30, 2020">30 -->
<div role="gridcell" class="{className} Calendar-day" data-date={date}>
	<button class="btn btn-day" tabindex="-1" aria-label={label}>{day}</button>
</div>

<style type="text/scss">
	@import 'day.scss';
</style>