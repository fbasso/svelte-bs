
<script>
	import {afterUpdate} from 'svelte';

	import {dropdown} from './dropdown.directive.js';
	import {qsa, containsClass} from '../util/dom.js';

    export let classname = '';
	export let isExpanded = false;

	let container;
	let nbItems = 0;
	afterUpdate(function() {
		if (container) {
			const itemElements = qsa(container, ".dropdown-item");
			nbItems = itemElements.length;
		}
	});

	/*
	 * Callback used to managed the keybord (event set on the dropdown container),
	 * By default, use the standard behavior based on focusabled dropdown-item
	*/
	export let onKeyDown = null;

	let node;
	let menu;

	const toggleDropdown = (e) => {
		if (containsClass(e.target, 'dropdown-toggle')) {
			isExpanded = !isExpanded;
		}
	}

	const toggleExpanded = (_isExpanded) => {
		isExpanded = _isExpanded;
	}

</script>

<div bind:this={container} class="dropdown {classname}" use:dropdown={{isExpanded, nbItems, onKeyDown, toggleExpanded}}>
	<slot />
</div>
