<script>
  // layout
  import AdminLayout from "../layouts/AdminLayout.svelte";
  import { watchResize } from "svelte-watch-resize";

  // components
  import WorkExperienceAdminTableRowDefaultCell from "../components/Resume/WorkExperienceAdminTable/WorkExperienceAdminTableRowDefaultCell/WorkExperienceAdminTableRowDefaultCell.svelte";
  import WorkExperienceAdminTableHeaderDefaultCell from "../components/Resume/WorkExperienceAdminTable/WorkExperienceAdminTableHeaderDefaultCell/WorkExperienceAdminTableHeaderDefaultCell.svelte";
  import WorkExperienceAdminTableRowAddressCell from "../components/Resume/WorkExperienceAdminTable/WorkExperienceAdminTableRowAddressCell/WorkExperienceAdminTableRowAddressCell.svelte";
  import VirtualTable from "../components/UI/Table/VirtualTable/VirtualTable.svelte";
  import { resumeStore } from "../stores/resume";
  import WorkExperienceAdminTableRowDateCell from "../components/Resume/WorkExperienceAdminTable/WorkExperienceAdminTableRowDateCell/WorkExperienceAdminTableRowDateCell.svelte";

  let workExperiencesVirtualTableWidth = 0;
  let workExperiencesVirtualTableColumns = [];
  $: workExperiencesVirtualTableColumns = [
    {
      display: 'Start Date',  // What will be displayed as the column header
      dataName: 'startDate',  // The key of a row to get the column's data from
      width: workExperiencesVirtualTableWidth * .20,
      cellComponent: WorkExperienceAdminTableRowDateCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'End Date',  // What will be displayed as the column header
      dataName: 'endDate',  // The key of a row to get the column's data from
      width: workExperiencesVirtualTableWidth * .20,
      cellComponent: WorkExperienceAdminTableRowDateCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Company Name',  // What will be displayed as the column header
      dataName: 'companyName',  // The key of a row to get the column's data from
      width: workExperiencesVirtualTableWidth * .30,
      cellComponent: WorkExperienceAdminTableRowDefaultCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Company Address',  // What will be displayed as the column header
      dataName: 'companyAddress',  // The key of a row to get the column's data from
      width: workExperiencesVirtualTableWidth * .70,
      cellComponent: WorkExperienceAdminTableRowAddressCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Position',  // What will be displayed as the column header
      dataName: 'position',  // The key of a row to get the column's data from
      width: workExperiencesVirtualTableWidth * .30,
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

  let schoolExperiencesVirtualTableWidth = 0;
  let schoolExperiencesVirtualTableColumns = [];
  $: schoolExperiencesVirtualTableColumns = [
    {
      display: 'School Name',  // What will be displayed as the column header
      dataName: 'schoolName',  // The key of a row to get the column's data from
      width: schoolExperiencesVirtualTableWidth,
      cellComponent: WorkExperienceAdminTableRowDefaultCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    }
  ];

  let certificationsVirtualTableWidth = 0;
  let certificationsVirtualTableColumns = [];
  $: certificationsVirtualTableColumns = [
    {
      display: 'Institution',  // What will be displayed as the column header
      dataName: 'institution',  // The key of a row to get the column's data from
      width: certificationsVirtualTableWidth,
      cellComponent: WorkExperienceAdminTableRowDefaultCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    }
  ];
</script>

<AdminLayout>
  <div slot="body">
    <div class="d-flex flex-row justify-space-around">
      <div
        style="height: 300px; min-height: 200px; width: 80%; padding-top: 10px;"
        use:watchResize={(node) => {
          workExperiencesVirtualTableWidth = node.clientWidth;
        }}
      >
        <VirtualTable
          rowHeight={50}
          rows={$resumeStore.workExperiences}
          columns={workExperiencesVirtualTableColumns}
        />
      </div>
    </div>

    <div class="d-flex flex-row justify-space-around">
      <div
        style="height: 300px; min-height: 200px; width: 80%; padding-top: 10px;"
        use:watchResize={(node) => {
          schoolExperiencesVirtualTableWidth = node.clientWidth;
        }}
      >
        <VirtualTable
          rowHeight={50}
          rows={$resumeStore.schoolExperiences}
          columns={schoolExperiencesVirtualTableColumns}
        />
      </div>
    </div>

    <div class="d-flex flex-row justify-space-around">
      <div
        style="height: 300px; min-height: 200px; width: 80%; padding-top: 10px;"
        use:watchResize={(node) => {
          certificationsVirtualTableWidth = node.clientWidth;
        }}
      >
        <VirtualTable
          rowHeight={50}
          rows={$resumeStore.certifications}
          columns={certificationsVirtualTableColumns}
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