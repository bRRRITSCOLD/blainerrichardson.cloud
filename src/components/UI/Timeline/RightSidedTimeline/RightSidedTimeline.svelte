<script lang="ts">
  // node_modules
  import { Card } from 'svelte-materialify/src';

  // props
  export let items: any[] = [];
</script>

<div class="timeline" >
  {#each items as item, i}
    <div class="container right">
      <Card>
        <slot item={item}>Missing template</slot>
      </Card>
    </div>
  {/each}
</div>

<style src="./RightSidedTimeline.scss">
</style>