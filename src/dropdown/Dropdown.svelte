
<script>

	import { dropdown } from './dropdown.directive.js';
	import { openPopper } from './popper.js';
	import { containsClass } from '../util/dom.js';

    export let classname = '';
	export let isExpanded = false;

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

	function positioningFn(dropdownToggle, menuElement) {
		openPopper(dropdownToggle, menuElement);
	}

</script>
<div class="dropdown {classname}" use:dropdown={{isExpanded, toggleExpanded, positioningFn}}>
	<slot />
</div>
