<script lang="ts">
  // components
 import VirtualTableHeaderDefaultCell from "../../../UI/Table/VirtualTableHeaderDefaultCell/VirtualTableHeaderDefaultCell.svelte";

 export let column: any;
</script>

<VirtualTableHeaderDefaultCell display={column.display}/>

<style lang="scss" src="./SchoolExperienceAdminTableHeaderDefaultCell.scss" >
</style>