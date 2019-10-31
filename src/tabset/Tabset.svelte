
<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { toggleCollapse } from '../util/transition.js';
	import { qs, qsa, toggleClass, attr, addEvent } from '../util/dom.js';

	import Tab from './Tab.svelte';

	export let selectedId = null;
	let dom;

	const titles = writable([]);
	const selectedIdStore = writable(selectedId);

	setContext('bs-tabset', {
		selectedId: selectedIdStore,
		titles
	});

	$: selectedId = $selectedIdStore;
	let slotLinks = [];

	$: {
		const selectedHref = '#' + selectedId;
		for(let i = 0; i < slotLinks.length; i++) {
			const link = slotLinks[i];
			const isSelected = attr(link, 'href') === selectedHref;
			toggleClass(link, 'active', isSelected);
			attr(link, 'aria-controls', selectedId);
			attr(link, 'aria-selected', isSelected);
		}
	}

	function onClick(e) {
		const target = e.target;
		if (target.tagName.toLowerCase() === 'a') {
			$selectedIdStore = attr(target, 'href').substr(1);
		}
	};

	onMount(() => {
		let destroyFn;
		const tabsSlot = qs('[slot="tabs"]', dom);
		if (tabsSlot) {
			destroyFn = addEvent(tabsSlot, 'click', onClick);
			toggleClass(tabsSlot, "nav", true);
			toggleClass(tabsSlot, "nav-tabs", true);
			attr(tabsSlot, "role", "tablist");
			slotLinks = qsa(".nav-link", dom);
			for(let i = 0; i < slotLinks; i++) {
				const link = slotLinks[i];
				attr(link, 'role', 'tab');
			}
		}
		if (!selectedId) {
			const tab = qs('[role="tab"]', dom);
			$selectedIdStore = attr(tab, 'href').substr(1);
		}
		return destroyFn;
	});

</script>
<div bind:this={dom}>
	<slot name="tabs">
		<ul class="nav nav-tabs" role="tablist">
			{#each $titles as {id, title}}
			<Tab panelId="{id}">{title}</Tab>
			{/each}
		</ul>
	</slot>
	<slot name="tab-content">
		<div class="tab-content">
		<slot />
		</div>
	</slot>
</div>
