<script>
  import { fade } from 'svelte/transition';
  import Style from '../../../../lib/actions/Style';

  let klass = '';
  export { klass as class };
  export let width = '256px';
  export let active = true;
  export let fixed = false;
  export let absolute = false;
  export let right = false;
  export let mini = false;
  export let clipped = false;
  export let borderless = false;
  export let miniWidth = '56px';
  export let clippedHeight = '56px';
</script>

<!-- <style lang="scss" src="./NavigationDrawer.scss" global>
</style> -->

<aside
  style="height: 100vh;"
  class="s-navigation-drawer {klass}"
  class:active
  class:fixed
  class:absolute
  class:right
  class:mini
  class:clipped
  on:hover
  use:Style={{ 'nav-width': width, 'nav-min-width': miniWidth, 'nav-clipped-height': clippedHeight }}
  >
  <slot name="prepend" />
  <div class="s-navigation-drawer__content">
    <slot />
  </div>
  <slot name="append" />
  {#if !borderless}
    <div class="s-navigation-drawer__border" />
  {/if}
</aside>
