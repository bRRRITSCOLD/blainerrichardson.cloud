<script lang="ts">
  // node_modules
  import {  format } from 'date-fns';

  // libs
  import { addressUtils } from '../../../../lib/utils';

  // components
  import InformationIconTooltip from '../../Tooltip/InformationIconToolTip/InforamtionIconToolTip.svelte'
  import VirtualTableRowDefaultCell from '../VirtualTableRowDefaultCell/VirtualTableRowDefaultCell.svelte'
  
  // props
  export let width;
  export let address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };

  let spanElement;
  let formattedAddress;
  $: formattedAddress = addressUtils.format({
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode
  });
</script>

<VirtualTableRowDefaultCell>
  <slot name="prepend" />
  {#if spanElement && spanElement.offsetWidth > width}
    <InformationIconTooltip>
      {formattedAddress}
    </InformationIconTooltip>
  {/if}
  <span bind:this={spanElement}>
    {formattedAddress}
  </span>
  <slot name="append" />
</VirtualTableRowDefaultCell>