
<script>
  import { onMount, beforeUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { config } from './config';

  const dispatch = createEventDispatcher();

  export let classname;
  export let enableAnimation = $config.enableAnimation;

  export let isVisible = true;

  let show = enableAnimation && isVisible;

  const dismiss = () => {
      dispatch('dismiss');
  };

  const onShow = (node) => {
     console.log('onShow');
     document.body.classList.add('modal-open');

     const footer = node.querySelector('[slot="footer"]');
     if (footer) {
       footer.classList.add('modal-footer');
     }
   };

   const onHide = (node) => {
      const styles = window.getComputedStyle(node);
      const delay = parseFloat(styles['transition'] || 0) * 1000;
      const duration = parseFloat(styles['transitionDuration'] || 0) * 1000;

      document.body.classList.remove('modal-open');
      node.classList.remove('show');
      return {
        delay,
        duration
      };
    }

</script>

{isVisible}
{#if isVisible}
<div class="modal" tabindex="-1" role="dialog" in:onShow out:onHide>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={dismiss}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <slot name="body">
      <div class="modal-body">
        <slot></slot>
      </div>
      </slot>
      <slot name="footer"></slot>
    </div>
  </div>
</div>
{/if}
