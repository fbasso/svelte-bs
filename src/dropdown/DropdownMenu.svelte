
<script lang="ts">
	import {afterUpdate} from 'svelte';
	import {qsa} from '../util/dom';
	import {dropdown} from './dropdown.directive';

    export let classname = '';
	export let isExpanded = false;
	export let title;

	let container;
	let nbItems = 0;
	afterUpdate(function() {
		if (container) {
			const itemElements = qsa(container, ".dropdown-item");
			nbItems = itemElements.length;
		}
	});

	const toggleExpanded = (_isExpanded) => {
		isExpanded = _isExpanded;
	}

</script>

<li bind:this={container} class="dropdown nav-item {classname}" use:dropdown={{isExpanded, nbItems, toggleExpanded}}>
	<button type="button" class="nav-link btn btn-link dropdown-toggle" data-bs-toggle="dropdown">{title}</button>
	{#if isExpanded}
	<slot></slot>
	{/if}
</li>

