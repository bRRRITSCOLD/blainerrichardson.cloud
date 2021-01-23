<script>
  // components
  import VirtualTableRowDateCell from '../../../UI/Table/VirtualTableRowDateCell/VirtualTableRowDateCell.svelte';
  
  // props
  export let data;
  export let dataName;
  export let width;

  let date;
  $: date = data && data[dataName]
    ? data[dataName]
    : '';
</script>

<div style="text-align: center;">
  <VirtualTableRowDateCell
    width={width}
    date={date}
  ></VirtualTableRowDateCell>
</div>

<style lang="scss" src="./SchoolExperienceAdminTableRowDateCell.scss" >
</style>