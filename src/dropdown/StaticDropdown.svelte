
<script>

	import { staticDropdown } from './dropdown.directive.js';
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

</script>

<div class="dropdown {classname}" use:staticDropdown={{isExpanded, toggleExpanded}}>
	<slot />
</div>
