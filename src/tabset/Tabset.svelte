
<script>
	import { onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';

	import { toggleCollapse } from '../util/transition.js';
	import { qs, qsa, toggleClass, addClass, attr, addEvent } from '../util/dom.js';

	import Tab from './Tab.svelte';

	export let selectedId = null;
	let dom;

	const titles = writable([]);
	const selectedIdStore = writable(selectedId);

	const context = {
		selectedId: selectedIdStore,
		titles,
		animation: false,
	}

	setContext('st-tabset', context);

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

	onMount(async () => {
		let destroyFn;
		const tabsSlot = qs(dom, '[slot="tabs"]');
		if (tabsSlot) {
			destroyFn = addEvent(tabsSlot, 'click', onClick);
			addClass(tabsSlot, "nav");
			addClass(tabsSlot, "nav-tabs");
			attr(tabsSlot, "role", "tablist");
			slotLinks = qsa(dom, ".nav-link");
			for(let i = 0; i < slotLinks; i++) {
				const link = slotLinks[i];
				attr(link, 'role', 'tab');
			}
		}
		if (!selectedId) {
			const tab = qs(dom, '[role="tab"]');
			$selectedIdStore = attr(tab, 'href').substr(1);
		}

		await tick();
		context.animation = true;
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
