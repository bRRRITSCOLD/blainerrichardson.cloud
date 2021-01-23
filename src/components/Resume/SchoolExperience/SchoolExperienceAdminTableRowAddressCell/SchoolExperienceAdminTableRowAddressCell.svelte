<script lang="ts">
  // components
  import VirtualTableRowAddressCell from "../../../UI/Table/VirtualTableRowAddressCell/VirtualTableRowAddressCell.svelte";

  // props
  export let data;
  export let dataName;
  export let width;

  let address: any;
  $: address = data && data[dataName]
      ? data && data[dataName]
      : '';
</script>

<VirtualTableRowAddressCell
  width={width}
  address={address}
></VirtualTableRowAddressCell>

<style lang="scss" src="./SchoolExperienceAdminTableRowAddressCell.scss" >
</style>