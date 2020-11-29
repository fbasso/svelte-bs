
<script>
	import {onMount, setContext} from 'svelte';

	export let expanded = [];
	export let multiple = true;

	if (multiple === 'false') {
		multiple = false;
	}

	const registeredFn = new Set();
	setContext('accordion', {
		expanded: expanded,
		registeredFn,
		togglePanel: (panelId) => {
			const index = expanded.indexOf(panelId);
			if (index > -1) {
				expanded.splice(index, 1);
			} else {
				if (!multiple) {
					expanded = [];
				}
				expanded.push(panelId);
			}

			expanded = [...expanded];

			registeredFn.forEach((fn) => {
				fn(expanded);
			});

			return expanded;
		}
	});

</script>

<div class="accordion">
	<slot></slot>
</div>