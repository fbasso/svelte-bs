
<script>
	import { onMount } from 'svelte';
	import { toggleCollapse } from '../util/transition';

	export let isVisible = true;
	let node;

	const hide = (node) => {
		return toggleCollapse(node);
	}

	const show = (node) => {
		return toggleCollapse(node);
	}

	onMount(() => {
		console.log('onMount', arguments);
		if (isVisible) {
			node.classList.add('show');
		}
	});


</script>

{#if isVisible}
<div class="collapse" in:show out:hide|local bind:this={node}>
    <slot></slot>
</div>
{/if}
