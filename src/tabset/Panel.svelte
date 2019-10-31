
<script context="module">
	let idCount = 0;
</script>
<script>

	import { onMount, getContext } from 'svelte';
	import { get } from 'svelte/store';

	import { collapse } from '../collapse/collapse.service.js';
	import { transitionTime, reflow } from '../util/transition';

	const tabsetContext = getContext('bs-tabset');
 	let selectedId = tabsetContext.selectedId;

	export let id = `tabpanel-${idCount++}`;
	export let title = '';

	if (title) {
		tabsetContext.titles.update((_titles) => {
			_titles.push({id, title});
			return _titles;
		});
	}

	$: isSelected = $selectedId === id;

	let panelElement;

	const show = (node) => {
		const timing = transitionTime(node);
		const delayStart = timing.delay + timing.duration;
		timing.delay *= 2;
		timing.duration *= 2;

		setTimeout(() => {
			const classList = node.classList;
			classList.add('active');
			reflow(node);
			classList.add('show');
		}, delayStart);

		return timing;
	};

	const hide = (node) => {
		const timing = transitionTime(node);
		const delayEnd = timing.delay + timing.duration;
		node.classList.remove('show');
		setTimeout(() => {
			node.classList.remove('active');
		}, delayEnd)
		return timing;
	};

	onMount(() => {
		if (isSelected) {
			const classList = panelElement.classList;
			classList.add('active');
			classList.add('show');
		}
	});

</script>
{#if isSelected}
<div bind:this={panelElement} class="tab-pane fade" id={id} role="tabpanel" aria-labelledby={id + '-tab'} in:show|local out:hide|local >
	<slot />
</div>
{/if}

