
<script>

	import { dropdown } from './dropdown.directive.js';

    export let classname = '';
    export let targetClassname = '';
	export let isExpanded = false;

	let node;
	let menu;

	const toggleDropdown = (e) => {
		if (e.target.classList.contains('dropdown-toggle')) {
			isExpanded = !isExpanded;
		}
	}

	const toggleExpanded = (_isExpanded) => {
		isExpanded = _isExpanded;
	}

</script>

<div class="dropdown" use:dropdown={{isExpanded, toggleExpanded}}>
	<slot name="toggle">
		<button class="btn {targetClassname} dropdown-toggle" type="button">
			Dropdown button
		</button>
	</slot>
	{#if isExpanded}
	<slot name="menu"></slot>
	{/if}
</div>
