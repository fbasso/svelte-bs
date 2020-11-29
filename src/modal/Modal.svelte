
<script>
	import {onMount, beforeUpdate, createEventDispatcher} from 'svelte';
	import {config} from './config.js';
	import {transitionTime, reflow} from '../util/transition.js';
	import {qs, addClass, removeClass, createElement, containsClass} from '../util/dom.js';

	const dispatch = createEventDispatcher();

	export let title = '';
	export let classname = '';
	// export let enableAnimation = $config.enableAnimation;
	export let isVisible = true;

	let dialogElement;

	export const dismiss = () => {
		dispatch('dismiss');
		isVisible = false;
	};

	const onClick = (e) => {
		if (containsClass(e.target, 'modal')) {
			dismiss();
		}
	}

	const onShow = (node) => {
		const body = document.body;
		addClass(body, 'modal-open');
		const backdrop = createElement('div');
		addClass(backdrop, 'modal-backdrop');
		addClass(backdrop, 'show');
		body.appendChild(backdrop);

		const header = qs(node, '[slot="header"]');
		if (header) {
			addClass(header, 'modal-header');
		}

		const footer = qs(node, '[slot="footer"]');
		if (footer) {
			addClass(footer, 'modal-footer');
		}

		reflow(node);
		addClass(node, 'show');

		// return transitionTime(node);
	};

	const onHide = (node) => {
		const body = document.body;
		removeClass(body, 'modal-open');
		const backdrop = qs(body, 'div.modal-backdrop');
		body.removeChild(backdrop);

		removeClass(node, 'show');
		return transitionTime(node);
	};

	export const onBlur = (e) => {
		// console.log(e);
		// if (!dialogElement.contains(e.relatedTarget)) {
		//	 e.preventDefault();
		// }
	}

</script>
{#if isVisible}
<div class="modal fade" tabindex="-1" role="dialog" in:onShow out:onHide on:click={onClick} bind:this={dialogElement}>
	<div class="modal-dialog {classname}" role="document" on:focusout={onBlur}>
		<div class="modal-content">
			<slot name="header">
				<div class="modal-header">
					<slot name="title">
						<h5 class="modal-title">{title}</h5>
					</slot>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={dismiss}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			</slot>
			<div class="modal-body">
				<slot></slot>
			</div>
			<slot name="footer"></slot>
		</div>
	</div>
</div>
{/if}
<style>
	.modal {
		display: block;
	}
</style>
