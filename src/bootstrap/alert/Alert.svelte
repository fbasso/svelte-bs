
<script>
    import { onMount, beforeUpdate } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { config } from './config';

    const dispatch = createEventDispatcher();

    export let type = $config.type;
    export let classname = '';
    export let enableAnimation = $config.enableAnimation;
    export let dismissible = $config.dismissible;

    export let isVisible = true;

    let show = enableAnimation && isVisible;
    const dismiss = () => {
        dispatch('dismiss');
    };

   const hide = (node) => {

        const styles = window.getComputedStyle(node);
        const delay = parseFloat(styles['transition'] || 0) * 1000;
        const duration = parseFloat(styles['transitionDuration'] || 0) * 1000;

        node.classList.remove('show');
        return {
            delay,
            duration
        };
    }

    beforeUpdate(() => {
		// show = enableAnimation && isVisible;
	});
</script>
{#if isVisible}
<div class="alert alert-{type} {classname}" class:show role="alert" class:fade={enableAnimation} out:hide>
    <slot></slot>
    {#if dismissible}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" on:click={dismiss}>
        <span aria-hidden="true">&times;</span>
    </button>
    {/if}
</div>
{/if}
