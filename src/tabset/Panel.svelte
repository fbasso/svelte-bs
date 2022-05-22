
<script context="module" lang="ts">
	let idCount = 0;
</script>
<script lang="ts">

	import {onMount, getContext} from 'svelte';
	import {get} from 'svelte/store';

	import {collapse} from '../collapse/collapse.service';
	import {transitionTime, reflow} from '../util/transition';
	import {addClass, removeClass} from '../util/dom';

	const tabsetContext = getContext('st-tabset');
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

		const {animation} = tabsetContext;
		const factor = animation ? 0 : 2;
		timing.delay *= factor;
		timing.duration *= factor;

		function addClasses() {
			addClass(node, 'active');
			if (animation) {
				reflow(node);
			}
			addClass(node, 'show');
		}

		if (animation) {
			setTimeout(addClasses, delayStart);
		} else {
			addClasses();
		}

		return timing;
	};

	const hide = (node) => {
		const timing = transitionTime(node);
		const delayEnd = timing.delay + timing.duration;
		removeClass(node, 'show');
		setTimeout(() => {
			removeClass(node, 'active');
		}, delayEnd)
		return timing;
	};

	onMount(() => {
		if (isSelected) {
			addClass(panelElement, 'active show');
		}
	});

</script>
{#if isSelected}
<div bind:this={panelElement} class="tab-pane fade" id={id} role="tabpanel" aria-labelledby={id + '-tab'} in:show|local out:hide|local >
	<slot />
</div>
{/if}

