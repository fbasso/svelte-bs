
<script>

	import { staticDropdown } from './dropdown.directive.js';

    export let classname = '';
	export let isExpanded = false;
	export let title;

	const toggleExpanded = (_isExpanded) => {
		isExpanded = _isExpanded;
	}

</script>

<li class="dropdown nav-item" use:staticDropdown={{isExpanded, toggleExpanded}}>
	<button type="button" class="nav-link btn btn-link dropdown-toggle" data-toggle="dropdown">{title}</button>
	{#if isExpanded}
	<slot name="menu"></slot>
	{/if}
</li>

