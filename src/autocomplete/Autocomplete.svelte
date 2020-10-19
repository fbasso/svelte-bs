<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { debounce } from 'Framework/services/utils.js';
	import { qsa, addClass } from 'Framework/services/dom.js';

	import Dropdown from '@sveltrap/dropdown/Dropdown.svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let classname = '';
	export let getSuggestions;
	export let listComponent = null;
	export let useCache = true;

	const cache = {};

	let inputContainer;
	let suggestions = [];

	function onClick(item) {
		if (item) {
			dispatch('itemSelect', item);
		}
		clearSuggestions();
	}

	function clearSuggestions() {
		suggestions = [];
	}

	onMount(function() {
		addClass(qsa(inputContainer, 'input')[0], 'dropdown-toggle');
	});

	const onInput = debounce(async ({target}) => {
		// isSuggestionsEnable = true;
		// searchValue = e.target.value;
		const searchValue = target.value.trim();
		if (!searchValue) {
			suggestions = [];
			return;
		}

		if (useCache) {
			const cacheValue = cache[searchValue];
			if (cacheValue) {
				suggestions = cacheValue;
				return;
			}
		}
		const response = await getSuggestions(searchValue);
		suggestions = response || [];

		if (useCache) {
			cache[searchValue] = suggestions;
		}

	}, 200);

</script>

<Dropdown isExpanded={suggestions.length} on:blur={clearSuggestions}>
	<div bind:this={inputContainer} on:input={onInput}>
	<slot>
		<input bind:value class={classname}>
	</slot>
	</div>
	{#if suggestions.length}
	<div class="dropdown-menu" on:click|preventDefault|stopPropagation={onClick}>
		{#each suggestions as item}
		{#if listComponent}
			 <svelte:component this={listComponent} value={item} />
		{:else}
			 <button class="dropdown-item" on:click={() => onClick(item)}>{item}</button>
		{/if}
		{/each}
	</div>
	{/if}
</Dropdown>