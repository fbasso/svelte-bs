<script>
	export let day;
	export let month;
	export let className = '';

	const label = month + '-' + day;
	const date = month + '-' + (day < 10 ? '0' : '') + day;
</script>
<!-- <div role="gridcell" class="Calendar-day disabled hidden" tabindex="-1" aria-label="Monday, March 30, 2020">30 -->
<div role="gridcell" class="{className} Calendar-day">
	<button class="btn btn-day" tabindex="-1" aria-label={label} data-date={date}>{day}</button>
</div>

<style type="text/scss">
	:global(div.Calendar-day) {
		cursor: pointer;
		text-align: center;
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		// border-radius: 0.25rem;

		display: flex;
		align-items: center;
		justify-content: center;

		&.outside {
			opacity: 0.5;
		}

		&:hover{
			border: 1px solid var(--info);
			text-decoration: none;
		}
	}
	:global(.btn.btn-day) {
		color: inherit;
		display: block;
		padding: 0.15rem 0.3rem;
		margin: 0;
		z-index: 1
	}
</style>