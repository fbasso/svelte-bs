
<script>
	import {createEventDispatcher, afterUpdate} from 'svelte';

	import {dropdown} from './dropdown.directive.js';
	import {openPopper} from './popper.js';
	import {qsa, containsClass, contains} from '../util/dom.js';

	const dispatch = createEventDispatcher();

    export let classname = '';
	export let isExpanded = false;

	$: dispatch(isExpanded ? 'dropdownopen' : 'dropdownclose');

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

	const toggleExpanded = (_isExpanded) => {
		isExpanded = _isExpanded;
	}

	function positioningFn(dropdownToggle, menuElement) {
		openPopper(dropdownToggle, menuElement);
	}

	function isInOut(target, relatedTarget) {
		return contains(container, target) && (!relatedTarget || !contains(container, relatedTarget))
	}

	function onFocusIn(e) {
		const {target, relatedTarget} = e;
		if (isInOut(target, relatedTarget)) {
			dispatch('focus', {target, relatedTarget});
		}
	}

	function onFocusOut(e) {
		const {target, relatedTarget} = e;
		if (isInOut(target, relatedTarget)) {
			dispatch('blur', {target, relatedTarget});
		}
	}

</script>
<div bind:this={container} class="dropdown {classname}" use:dropdown={{isExpanded, nbItems, onKeyDown, toggleExpanded, positioningFn}} on:input on:change
	on:focusout={onFocusOut} on:focusin={onFocusIn}>
	<slot />
</div>
