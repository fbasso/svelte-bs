
<script>

	import { dropdown } from './dropdown.directive';

    export let classname = '';
	export let isExpanded = false;

	let node;
	let menu;

	const toggleDropdown = (e) => {
		if (e.target.classList.contains('dropdown-toggle')) {
			isExpanded = !isExpanded;
		}
	}

</script>

<div class="dropdown" class:show={isExpanded} on:click={toggleDropdown} use:dropdown={{isExpanded}}>
	<slot name="toggle">
		<button class="btn btn-secondary dropdown-toggle" type="button">
			Dropdown button
		</button>
	</slot>
	{#if isExpanded}
	<slot name="menu"></slot>
	{/if}
</div>
