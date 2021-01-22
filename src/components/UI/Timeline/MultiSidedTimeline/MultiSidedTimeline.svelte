<script lang="ts">
  // node_modules
  import { Card } from 'svelte-materialify/src';

  // props
  export let items: any[] = [];
</script>

<div class="timeline" >
  {#each items as item, i}
    {#if i % 2 === 0}
      <div class="container left">
        <Card>
          <slot item={item}>Missing template</slot>
        </Card>
      </div>
    {:else}
      <div class="container right">
        <Card>
          <slot item={item}>Missing template</slot>
        </Card>
      </div>
    {/if}
  {/each}
</div>

<style src="./MultiSidedTimeline.scss">
</style>