<script lang="ts">
	import {createEventDispatcher, tick} from 'svelte';

	const dispatch = createEventDispatcher();

	export let item;

	function selectItem() {
		dispatch('itemselect', item);
	}
</script>
<button class="dropdown-item" on:click={selectItem}>{item.text || item}</button>