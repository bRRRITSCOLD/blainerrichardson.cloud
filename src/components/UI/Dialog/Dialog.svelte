<script>
  import { Overlay } from 'svelte-materialify/src';
  import Style from '../../../lib/actions/Style';
  import { scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  let klass = '';
  export { klass as class };
  export let active = false;
  export let persistent = false;
  export let disabled = false;
  export let width = 500;
  export let fullscreen = false;
  export let transition = scale;
  export let overlay = {};

  const dispatch = createEventDispatcher();

  function close() {
    if (!persistent) active = false;
    dispatch('onOverlayClick', true);
  }
  $: visible = active && !disabled;
</script>

{#if visible}
  <div role="document" class="s-dialog" use:Style={{ 'dialog-width': width }}>
    <div
      class="s-dialog__content {klass}"
      class:fullscreen
      transition:transition={{ duration: 300, start: 0.1 }}>
      <slot />
    </div>
  </div>
{/if}
<Overlay {...overlay} active={visible} on:click={close} />
