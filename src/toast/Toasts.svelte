<script>
	import Toast from './Toast.svelte';

	export let toasts;

	function remove(i) {
		toasts.splice(i, 1);
		toasts = toasts;
	}

</script>
{#if toasts && toasts.length}
<div class="toasts">
	{#each toasts as {title, text, type, delay, id}, i (id)}
	<Toast {title} {type} {delay} on:close={() => remove(i)}>
		{text}
	</Toast>
	{/each}
</div>
{/if}
