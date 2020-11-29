<script>
	import {onMount, createEventDispatcher} from 'svelte';
	import {qs, addClass, removeClass} from '../util/dom.js';
	import {transitionTime} from '../util/transition.js';

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

	function clearTimeout() {
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
		clearTimeout();
		removeClass(node, 'show');
		return transitionTime(node);
	};

	onMount(() => {
		if (delay) {
			clearTimeout();
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
				<strong class="mr-auto">{title}</strong>
				<button type="button" class="ml-2 mb-1 close" aria-label="Close" on:click={close}>
					<span aria-hidden="true">&times;</span>
				</button>
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