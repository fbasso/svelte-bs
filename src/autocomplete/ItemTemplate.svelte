<script>
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	export let item;

	function selectItem() {
		// Timeout to be sure to dispatch it after all other syncronous actions
		setTimeout(function() {
			dispatch('itemselect', item);
		});
	}
</script>
<button class="dropdown-item" on:click={selectItem}>{item.text || item}</button>