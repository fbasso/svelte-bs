
<script>
	import {createEventDispatcher} from 'svelte';

	import {dropdown} from './dropdown.directive.js';
	import {openPopper} from './popper.js';
	import {containsClass, contains} from '../util/dom.js';

	const dispatch = createEventDispatcher();

    export let classname = '';
	export let isExpanded = false;

	/*
	 * Callback used to managed the keybord (event set on the dropdown container),
	 * By default, use the standard behavior based on focusabled dropdown-item
	*/
	export let onKeyDown = null;

	let container;

	const toggleDropdown = (e) => {
		if (containsClass(e.target, 'dropdown-toggle')) {
			isExpanded = !isExpanded;
		}
	}

	const toggleExpanded = (_isExpanded) => {
		const effectiveToggle = isExpanded !== _isExpanded;
		isExpanded = _isExpanded;
		if (effectiveToggle) {
			dispatch(isExpanded ? 'dropdownopen' : 'dropdownclose');
		}
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
<div bind:this={container} class="dropdown {classname}" use:dropdown={{isExpanded, onKeyDown, toggleExpanded, positioningFn}} on:input on:change
	on:focusout={onFocusOut} on:focusin={onFocusIn}>
	<slot />
</div>
