<script>
  // layout
  import AdminLayout from "../layouts/AdminLayout.svelte";
  import { watchResize } from "svelte-watch-resize";
  import { onMount } from "svelte";

  // components
  import WorkExperienceAdminTable from "../components/Resume/WorkExperience/WorkExperienceAdminTable/WorkExperienceAdminTable.svelte";

  // stores
  import { resumeStore } from "../stores/resume";
import { uiStore } from "../stores/ui";

  let workExperiencesVirtualTableWidth = 0;
  let workExperiencesVirtualTableHeight = 0;

  onMount(async () => {
    await Promise.all([
      resumeStore.searchWorkExperiences({
        searchCriteria: {},
        searchOptions: {
          pageSize: Number.MAX_SAFE_INTEGER,
          pageNumber: 1
        }
      })
    ]);

    console.log($resumeStore.workExperiences)
  })
</script>

<AdminLayout>
  <div slot="body">
    <div class="d-flex flex-row justify-space-around">
      <div
        style="height: 500px; min-height: 500px; width: 80%; padding-top: 10px;"
        use:watchResize={(node) => {
          workExperiencesVirtualTableWidth = node.offsetWidth;
          workExperiencesVirtualTableHeight = node.offsetHeight;
        }}
      >
        <WorkExperienceAdminTable
          height={workExperiencesVirtualTableHeight}
          width={workExperiencesVirtualTableWidth}
          workExperiences={$resumeStore.workExperiences}
          addWorkExperienceDialogActive={$uiStore.isAddWorkExperienceDialogOpen}
          isAddingWorkExperience={$resumeStore.isPuttingWorkExperiences}
          on:onAddButtonClick={async (event) => {
            uiStore.openAddWorkExperienceDialog();
          }}
          on:onAddWorkExperienceDialogCloseButtonClick={async (event) => {
            uiStore.closeAddWorkExperienceDialog();
          }}
        />
      </div>
    </div>

    <!-- <div class="d-flex flex-row justify-space-around">
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
    </div> -->
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