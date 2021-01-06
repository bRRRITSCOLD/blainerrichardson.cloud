<script>
  // layout
  import AdminLayout from "../layouts/AdminLayout.svelte";
  import { watchResize } from "svelte-watch-resize";

  // components
  import WorkExperienceAdminTableRowDefaultCell from "../components/Resume/WorkExperienceAdminTable/WorkExperienceAdminTableRowDefaultCell/WorkExperienceAdminTableRowDefaultCell.svelte";
  import WorkExperienceAdminTableHeaderDefaultCell from "../components/Resume/WorkExperienceAdminTable/WorkExperienceAdminTableHeaderDefaultCell/WorkExperienceAdminTableHeaderDefaultCell.svelte";
  import VirtualTable from "../components/UI/Table/VirtualTable/VirtualTable.svelte";

  let rows = [
    { cell: 'cellOne' },
    { cell: 'cellTwo' },
    { cell: 'cellThree' }
  ]
  let virtualTableWidth = 0;
  let virtualTableColumns = [];
  $: virtualTableColumns = [
    {
      display: 'Cell',  // What will be displayed as the column header
      dataName: 'cell',  // The key of a row to get the column's data from
      width: virtualTableWidth,
      cellComponent: WorkExperienceAdminTableRowDefaultCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    // {
    //   display: 'Date',  // What will be displayed as the column header
    //   dataName: 'date',  // The key of a row to get the column's data from
    //   width: virtualTableWidth * .20,
    //   cellComponent: LogGroupDetailsTableRowDateCell,
    //   headerComponent: LogGroupDetailsTableHeaderCell
    // },
    // // {
    // //   display: 'Hash',  // What will be displayed as the column header
    // //   dataName: 'hash',  // The key of a row to get the column's data from
    // //   width: virtualTableWidth * .35,
    // //   cellComponent: LogGroupDetailsTableRowDefaultCell,
    // //   headerComponent: LogGroupDetailsTableHeaderCell
    // // },
    // {
    //   display: 'Name',  // What will be displayed as the column header
    //   dataName: 'name',  // The key of a row to get the column's data from
    //   width: virtualTableWidth * .70,
    //   cellComponent: LogGroupDetailsTableRowDefaultCell,
    //   headerComponent: LogGroupDetailsTableHeaderCell
    // }
  ];
</script>

<AdminLayout>
  <div slot="body">
    lol
    <div class="d-flex flex-row justify-space-around">
      <div
        style="height: 300px; min-height: 200px; width: 80%; padding-top: 10px;"
        use:watchResize={(node) => {
          virtualTableWidth = node.clientWidth;
        }}
      >
        <VirtualTable
          rowHeight={50}
          rows={rows}
          columns={virtualTableColumns}
        />
      </div>
    </div>
  </div>
  <!-- <VirtualTable
    rowHeight={50}
    rows={logGroupFiles} 
    columns={virtualTableColumns}
    on:onVirtualTableRowCellClick={(event) => {
      if (event.detail.columnIndex === 0) {
        dispatch('onTableRowSelectedCellClick', { rowIndex: event.detail.rowIndex });
      }
    }}
  /> -->
</AdminLayout>
<!-- <div>
  lol
</div> -->