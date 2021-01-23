<script lang="ts">
  // layout
  import AdminLayout from "../layouts/AdminLayout.svelte";
  import { watchResize } from "svelte-watch-resize";
  import { onMount } from "svelte";

  // components
  import WorkExperienceAdminTable from "../components/Resume/WorkExperience/WorkExperienceAdminTable/WorkExperienceAdminTable.svelte";

  // stores
  import { resumeStore } from "../stores/resume";
  import { uiStore } from "../stores/ui";
  import { userStore } from "../stores/user";
import SchoolExperienceAdminTable from "../components/Resume/SchoolExperience/SchoolExperienceAdminTable/SchoolExperienceAdminTable.svelte";

  let workExperiencesVirtualTableWidth = 0;
  let workExperiencesVirtualTableHeight = 0;
  let currentEditingWorkExperience = undefined;

  let schoolExperiencesVirtualTableWidth = 0;
  let schoolExperiencesVirtualTableHeight = 0;
  let currentEditingSchoolExperience = undefined;

  onMount(async () => {
    await Promise.all([
      resumeStore.searchWorkExperiences({
        searchCriteria: {},
        searchOptions: {
          pageSize: Number.MAX_SAFE_INTEGER,
          pageNumber: 1
        }
      }),
      resumeStore.searchSchoolExperiences({
        searchCriteria: {},
        searchOptions: {
          pageSize: Number.MAX_SAFE_INTEGER,
          pageNumber: 1
        }
      })
    ]);

    console.log($resumeStore.workExperiences)
  });

  $: console.log('$uiStore.isAddWorkExperienceDialogOpen=', $uiStore.isAddWorkExperienceDialogOpen);

</script>

<AdminLayout>
  <div slot="body">
    <div class="d-flex flex-row justify-space-around" style="padding-top: 10px;">
      <div
        style="height: 500px; min-height: 500px; width: 80%;"
        use:watchResize={(node) => {
          workExperiencesVirtualTableWidth = node.offsetWidth;
          workExperiencesVirtualTableHeight = node.offsetHeight;
        }}
      >
        {#if workExperiencesVirtualTableWidth > 0 && workExperiencesVirtualTableHeight > 0}
          <WorkExperienceAdminTable
            height={workExperiencesVirtualTableHeight}
            width={workExperiencesVirtualTableWidth}
            workExperiences={$resumeStore.workExperiences}
            addWorkExperienceDialogActive={$uiStore.isAddWorkExperienceDialogOpen}
            isAddingWorkExperience={$resumeStore.isPuttingWorkExperiences}
            currentEditingWorkExperience={currentEditingWorkExperience}
            on:onAddButtonClick={async (event) => {
              uiStore.openAddWorkExperienceDialog();
            }}
            on:onAddWorkExperienceDialogSubmitButtonClick={async (event) => {
              console.log(`onAddWorkExperienceDialogSubmitButtonClick - jwt=`,$userStore.jwt)
              await resumeStore.putWorkExperiences({ jwt: $userStore.jwt, workExperiences: [event.detail] });
              if (!$resumeStore.putWorkExperiencesError) {
                uiStore.closeAddWorkExperienceDialog();
                currentEditingWorkExperience = undefined;
              }
            }}
            on:onAddWorkExperienceDialogCloseButtonClick={async (event) => {
              uiStore.closeAddWorkExperienceDialog();
            }}
            on:onAddWorkExperienceDialogOverlayClick={() => {
              currentEditingWorkExperience = undefined;
            }}
            on:onTableRowActionsCellTrashCanIconClick={async (event) => {
              console.log(`onTableRowActionsCellTrashCanIconClick = jwt=`,$userStore.jwt);
              await resumeStore.deleteWorkExperiences({ jwt: $userStore.jwt, workExperienceIds: [event.detail.workExperienceId] });
              currentEditingWorkExperience = undefined;
              uiStore.closeAddWorkExperienceDialog();
            }}
            on:onTableRowActionsCellPenIconClick={async (event) => {
              console.log(`onTableRowActionsCellPenIconClick = jwt=`,$userStore.jwt)
              currentEditingWorkExperience = event.detail;
              uiStore.openAddWorkExperienceDialog();
            }}
          />
        {/if}
      </div>
    </div>

    <div class="d-flex flex-row justify-space-around" style="padding-top: 10px;">
      <div
        style="height: 500px; min-height: 500px; width: 80%;"
        use:watchResize={(node) => {
          schoolExperiencesVirtualTableWidth = node.offsetWidth;
          schoolExperiencesVirtualTableHeight = node.offsetHeight;
        }}
      >
        {#if schoolExperiencesVirtualTableWidth > 0 && schoolExperiencesVirtualTableHeight > 0}
          <SchoolExperienceAdminTable 
            height={schoolExperiencesVirtualTableHeight}
            width={schoolExperiencesVirtualTableWidth}
            schoolExperiences={$resumeStore.schoolExperiences}
            addSchoolExperienceDialogActive={$uiStore.isAddSchoolExperienceDialogOpen}
            isAddingSchoolExperience={$resumeStore.isPuttingSchoolExperiences}
            currentEditingSchoolExperience={currentEditingSchoolExperience}
            on:onAddButtonClick={async (event) => {
              uiStore.openAddSchoolExperienceDialog();
            }}
            on:onAddSchoolExperienceDialogSubmitButtonClick={async (event) => {
              console.log(`onAddSchoolExperienceDialogSubmitButtonClick - jwt=`,$userStore.jwt)
              await resumeStore.putSchoolExperiences({ jwt: $userStore.jwt, schoolExperiences: [event.detail] });
              if (!$resumeStore.putSchoolExperiencesError) {
                uiStore.closeAddSchoolExperienceDialog();
                currentEditingSchoolExperience = undefined;
              }
            }}
            on:onAddSchoolExperienceDialogCloseButtonClick={async (event) => {
              uiStore.closeAddSchoolExperienceDialog();
            }}
            on:onAddSchoolExperienceDialogOverlayClick={() => {
              currentEditingSchoolExperience = undefined;
            }}
            on:onTableRowActionsCellTrashCanIconClick={async (event) => {
              console.log(`onTableRowActionsCellTrashCanIconClick = jwt=`,$userStore.jwt);
              await resumeStore.deleteSchoolExperiences({ jwt: $userStore.jwt, schoolExperienceIds: [event.detail.workExperienceId] });
              currentEditingSchoolExperience = undefined;
              uiStore.closeAddSchoolExperienceDialog();
            }}
            on:onTableRowActionsCellPenIconClick={async (event) => {
              console.log(`onTableRowActionsCellPenIconClick = jwt=`,$userStore.jwt)
              currentEditingSchoolExperience = event.detail;
              uiStore.openAddSchoolExperienceDialog();
            }}
          />
        {/if}
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