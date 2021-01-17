<script lang="ts">
  // node_modules
  import { Icon } from 'svelte-materialify/src';
  import { mdiTrashCan, mdiPen } from '@mdi/js';

  // components
  import VirtualTableRowDefaultCell from '../../../UI/Table/VirtualTableRowDefaultCell/VirtualTableRowDefaultCell.svelte';

  // props
  export let data;
  export let handlers;
</script>

<div style="text-align: center;">
  <VirtualTableRowDefaultCell>
    <span on:click={() => {
      if (handlers && handlers.onTrashCanIconLinkClick) {
        console.log('data=', data);
        handlers.onTrashCanIconLinkClick(data);
      }
    }}>
      <Icon path={mdiTrashCan} />
    </span>
    <span on:click={() => {
      if (handlers && handlers.onPenIconLinkClick) {
        handlers.onPenIconLinkClick(data);
      }
    }}>
      <Icon path={mdiPen} />
    </span>
  </VirtualTableRowDefaultCell>
</div>