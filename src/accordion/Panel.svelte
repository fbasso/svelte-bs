
<script context="module">
	let idCount = 0;
</script>
<script>

	import Collapse from '../collapse/Collapse.svelte';
	import { collapse } from '../collapse/collapse.service.js';
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
	<div class="card-header" on:click={() => {context.togglePanel(id)}}>
		<slot name="title">
			<h2 class="mb-0">
				<button class="btn btn-link" type="button" use:collapse={{collapseId: id, isExpanded: isExpanded}}>
					{title}
				</button>
			</h2>
		</slot>
	</div>
	<Collapse isExpanded={isExpanded} id={id}>
		<div class="card-body">
			<slot></slot>
		</div>
	</Collapse>
</div>
