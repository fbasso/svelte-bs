<script lang="ts">
	import {getContext, onMount} from 'svelte';
	import {get} from 'svelte/store';

	export let panelId;

	const tabsetContext = getContext('st-tabset');
 	let selectedId = tabsetContext.selectedId;
	// let isSelected = false;
	$: isSelected = $selectedId === panelId;

	const selectTab = (e) => {
		$selectedId = e.target.getAttribute('href').substr(1);
	};

</script>

<li class="nav-item">
	<a class="nav-link {isSelected}" class:active={isSelected} aria-selected={isSelected} href="#{panelId}" role="tab" on:click|preventDefault={selectTab}><slot /></a>
</li>
