
<script>
  import { onMount, beforeUpdate } from 'svelte';
  import { config } from './config';
  import { createEventDispatcher } from 'svelte';
  import { transitionTime, reflow } from '../util/transition';

  const dispatch = createEventDispatcher();

  export let classname;
  export let enableAnimation = $config.enableAnimation;

  export let isVisible = true;

  export const dismiss = () => {
      dispatch('dismiss');
      isVisible = false;
  };

  const onClick = (e) => {
    if (e.target.classList.contains('modal')) {
      dismiss();
    }
  }

  export const onShow = (node) => {
    const body = document.body;
    body.classList.add('modal-open');
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    backdrop.classList.add('show');
    body.appendChild(backdrop);

    const header = node.querySelector('[slot="header"]');
    if (header) {
    header.classList.add('modal-header');
    }

    const footer = node.querySelector('[slot="footer"]');
    if (footer) {
      footer.classList.add('modal-footer');
    }

    reflow(node);
    node.classList.add('show');

    return transitionTime(node);
  };

  export const onHide = (node) => {
    const body = document.body;
    body.classList.remove('modal-open');
    const backdrop = body.querySelector('div.modal-backdrop');
    body.removeChild(backdrop);

    node.classList.remove('show');
    return transitionTime(node);
  }


</script>

{isVisible}
{#if isVisible}
<div class="modal fade" tabindex="-1" role="dialog" in:onShow out:onHide on:click={onClick}>
  <div class="modal-dialog {classname}" role="document">
    <div class="modal-content">
      <slot name="header">
        <div class="modal-header">
          <slot name="title">
            <h5 class="modal-title"> </h5>
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
