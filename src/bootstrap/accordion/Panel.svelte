
<script context="module">
	let idCount = 0;
</script>
<script>

	import Collapse from '../collapse/Collapse.svelte';
	import { collapse } from '../collapse/collapse.service';
	import { onMount, getContext, beforeUpdate } from 'svelte';

	export let id = `panel-${idCount++}`;
	export let title = '';

	let isExpanded = false;


	let context = getContext('accordion');
	const togglePanel = (expandedIds, id) => {
		isExpanded = expandedIds.includes(id);
	}

	togglePanel(context.expanded, id);

	onMount(() => {
		context.registeredFn.add((panelsIds) => {
			togglePanel(panelsIds, id);
		})
	});

</script>

<div class="card">
	<div class="card-header">
		<h2 class="mb-0">
		<button class="btn btn-link" type="button" on:click={() => {context.togglePanel(id)}} use:collapse={{collapseId: id, isExpanded: isExpanded}}>
			{title}
		</button>
		</h2>
	</div>
	<Collapse isExpanded={isExpanded} id={id}>
		<slot></slot>
	</Collapse>
</div>
