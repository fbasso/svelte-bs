
<script>

	import {dropdown} from './dropdown.directive.js';
	import {containsClass} from '../util/dom.js';

    export let classname = '';
	export let isExpanded = false;

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

<div class="dropdown {classname}" use:dropdown={{isExpanded,onKeyDown, toggleExpanded}}>
	<slot />
</div>
