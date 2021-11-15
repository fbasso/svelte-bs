<script>
	import {createDropdownModel} from '../models/dropdown.js';

	export let dropdownModel = createDropdownModel();
	export let classname = '';

	$: ({isOpen, list, isExpanded, select} = dropdownModel);

</script>
<div class="dropdown {classname}" class:show={$isExpanded}>
	<slot />
	{#if $isExpanded}
		<ul class="dropdown-menu show">
			{#each $list as item}
			<li class="dropdown-item" on:click={() => select(item)}><slot name="item"><button type="button">{item}</button></slot></li>
			{/each}
		</ul>
	{/if}
</div>
