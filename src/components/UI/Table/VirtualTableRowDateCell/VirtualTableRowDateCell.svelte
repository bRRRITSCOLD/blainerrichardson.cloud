<script lang="ts">
  // node_modules
  import {  format } from 'date-fns';

  // components
  import InformationIconTooltip from '../../Tooltip/InformationIconToolTip/InforamtionIconToolTip.svelte'
  import VirtualTableRowDefaultCell from '../VirtualTableRowDefaultCell/VirtualTableRowDefaultCell.svelte'
  
  // props
  export let width;
  export let date;

  let spanElement;
  let formattedDate;
  $: formattedDate = format(new Date(date), `MMMM',' yyyy`);
</script>

<VirtualTableRowDefaultCell>
  <slot name="prepend" />
  {#if spanElement && spanElement.offsetWidth > width}
    <InformationIconTooltip>
      {formattedDate}
    </InformationIconTooltip>
  {/if}
  <span bind:this={spanElement}>
    {formattedDate}
  </span>
  <slot name="append" />
</VirtualTableRowDefaultCell>