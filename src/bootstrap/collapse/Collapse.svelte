
<script>
	import { onMount } from 'svelte';
	import { toggleCollapse } from '../util/transition';

	export let isExpanded = true;
	let node;

	const hide = (node) => {
		return toggleCollapse(node, 'hide');
	}

	const show = (node) => {
		return toggleCollapse(node, 'show');
	}

</script>
{#if isExpanded}
<div class="collapse show" in:show|local out:hide|local>
    <slot></slot>
</div>
{/if}
