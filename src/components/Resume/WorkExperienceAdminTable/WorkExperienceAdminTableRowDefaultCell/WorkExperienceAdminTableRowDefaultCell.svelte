<script lang="ts">
  // components
  import InformationIconTooltip from '../../../UI/Tooltip/InformationIconToolTip/InforamtionIconToolTip.svelte'
  import VirtualTableRowDefaultCell from '../../../UI/Table/VirtualTableRowDefaultCell/VirtualTableRowDefaultCell.svelte'

  // props
  export let width;
  export let text;

  let spanElement;
</script>

<VirtualTableRowDefaultCell>
  {#if spanElement && spanElement.offsetWidth > width}
    <InformationIconTooltip>
      {text}
    </InformationIconTooltip>
  {/if}
  <span bind:this={spanElement}>
    {text}
  </span>
</VirtualTableRowDefaultCell>

