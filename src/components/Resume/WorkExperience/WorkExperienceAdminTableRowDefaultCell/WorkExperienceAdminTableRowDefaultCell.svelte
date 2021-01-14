<script lang="ts">
  // components
  import InformationIconTooltip from '../../../UI/Tooltip/InformationIconToolTip/InforamtionIconToolTip.svelte'
  import VirtualTableRowDefaultCell from '../../../UI/Table/VirtualTableRowDefaultCell/VirtualTableRowDefaultCell.svelte'

  // props
  export let data;
  export let dataName;
  export let width;

  let spanElement;
  let text: any;
  $: text = data && data[dataName]
      ? data && data[dataName]
      : '';
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

