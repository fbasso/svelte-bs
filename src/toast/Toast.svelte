<script lang="ts">
	import {onMount, createEventDispatcher} from 'svelte';
	import {qs, addClass, removeClass} from '../util/dom';
	import {transitionTime} from '../util/transition';

	const dispatch = createEventDispatcher();

	export let title;
	export let displayBody = true;
	export let type;
	export let delay = 0;

	let headerClassname = '';
	let mainClassname = '';
	$: {
		if (type) {

			if (title) {
				headerClassname = 'text-light bg-' + type;
			} else {
				mainClassname = 'text-light bg-' + type;
			}
		}
	}

	let timeoutId = null;

	function clearToastTimeout() {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	}

	function close() {
		dispatch('close');
	}

	function show(node) {
		addClass(node, 'show');

		const header = qs(node, '[slot="header"]');
		if (header) {
			addClass(header, 'toast-header');
		}

		const footer = qs(node, '[slot="footer"]');
		if (footer) {
			addClass(footer, 'toast-footer');
		}
	};

	function hide(node) {
		clearToastTimeout();
		removeClass(node, 'show');
		return transitionTime(node);
	};

	onMount(() => {
		if (delay) {
			clearToastTimeout();
			timeoutId = setTimeout(() => {
				close();
			}, delay);
		}
	});

</script>

<div class="toast fade {mainClassname}" in:show out:hide role="alert" aria-live="assertive" aria-atomic="true">
	{#if title}
		<slot name="header">
			<div class="toast-header {headerClassname}" class:nobody={!displayBody}>
				<strong class="me-auto">{title}</strong>
				<button type="button" class="ms-2 mb-1 btn-close btn-close-white" aria-label="Close" on:click={close}></button>
			</div>
		</slot>
	{/if}
	{#if displayBody}
	<slot name="body">
		<div class="toast-body">
			<slot />
		</div>
	</slot>
	{/if}
</div>
<style>
	.nobody {
		border-bottom: 0;
	}
</style>