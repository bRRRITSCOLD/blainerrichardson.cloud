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

<VirtualTableRowDateCell
  width={width}
  date={date}
></VirtualTableRowDateCell>
  
<style lang="scss" src="./WorkExperienceAdminTableRowDateCell.scss" >
</style>