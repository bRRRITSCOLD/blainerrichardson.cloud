<script lang="ts">
  // node_modules
  import { Icon } from 'svelte-materialify/src';
  import { mdiTrashCan, mdiPen } from '@mdi/js';

  // components
  import VirtualTableRowDefaultCell from '../../../UI/Table/VirtualTableRowDefaultCell/VirtualTableRowDefaultCell.svelte';

  // props
  export let handlers;
</script>

<div style="text-align: center;">
  <VirtualTableRowDefaultCell>
    <span on:click={() => {
      if (handlers && handlers.onTrashCanIconLink) {
        handlers.onTrashCanIconLink(true);
      }
    }}>
      <Icon path={mdiTrashCan} />
    </span>
    <span on:click={() => {
      if (handlers && handlers.onPenIconLink) {
        handlers.onPenIconLink(true);
      }
    }}>
      <Icon path={mdiPen} />
    </span>
  </VirtualTableRowDefaultCell>
</div>