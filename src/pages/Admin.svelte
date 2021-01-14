<script>
  // layout
  import AdminLayout from "../layouts/AdminLayout.svelte";
  import { watchResize } from "svelte-watch-resize";

  // components
  import WorkExperienceAdminTableRowDefaultCell from "../components/Resume/WorkExperience/WorkExperienceAdminTableRowDefaultCell/WorkExperienceAdminTableRowDefaultCell.svelte";
  import WorkExperienceAdminTableHeaderDefaultCell from "../components/Resume/WorkExperience/WorkExperienceAdminTableHeaderDefaultCell/WorkExperienceAdminTableHeaderDefaultCell.svelte";
  import WorkExperienceAdminTableRowAddressCell from "../components/Resume/WorkExperience/WorkExperienceAdminTableRowAddressCell/WorkExperienceAdminTableRowAddressCell.svelte";
  import VirtualTable from "../components/UI/Table/VirtualTable/VirtualTable.svelte";
  import { resumeStore } from "../stores/resume";
  import WorkExperienceAdminTableRowDateCell from "../components/Resume/WorkExperience/WorkExperienceAdminTableRowDateCell/WorkExperienceAdminTableRowDateCell.svelte";
import WorkExperienceAdminTable from "../components/Resume/WorkExperience/WorkExperienceAdminTable/WorkExperienceAdminTable.svelte";

  let workExperiencesVirtualTableWidth = 0;
  let workExperiencesVirtualTableHeight = 0;

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
          workExperiencesVirtualTableWidth = node.offsetWidth;
          workExperiencesVirtualTableHeight = node.offsetHeight;
        }}
      >
        <WorkExperienceAdminTable
          height={workExperiencesVirtualTableHeight}
          width={workExperiencesVirtualTableWidth}
          workExperiences={$resumeStore.workExperiences}
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