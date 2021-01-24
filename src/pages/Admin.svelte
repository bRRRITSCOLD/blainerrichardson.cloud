<script lang="ts">
  // layout
  import AdminLayout from "../layouts/AdminLayout.svelte";
  import { watchResize } from "svelte-watch-resize";
  import { onMount } from "svelte";

  // components
  import WorkExperienceAdminTable from "../components/Resume/WorkExperience/WorkExperienceAdminTable/WorkExperienceAdminTable.svelte";
  import SchoolExperienceAdminTable from "../components/Resume/SchoolExperience/SchoolExperienceAdminTable/SchoolExperienceAdminTable.svelte";
  import CertificationsAdminTable from "../components/Resume/Certifications/CertificationsAdminTable/CertificationsAdminTable.svelte";

  // stores
  import { resumeStore } from "../stores/resume";
  import { uiStore } from "../stores/ui";
  import { userStore } from "../stores/user";

  let workExperiencesVirtualTableWidth = 0;
  let workExperiencesVirtualTableHeight = 0;
  let currentEditingWorkExperience = undefined;

  let schoolExperiencesVirtualTableWidth = 0;
  let schoolExperiencesVirtualTableHeight = 0;
  let currentEditingSchoolExperience = undefined;

  let certificationsVirtualTableWidth = 0;
  let certificationsVirtualTableHeight = 0;
  let currentEditingCertification = undefined;

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
      }),
      resumeStore.searchCertifications({
        searchCriteria: {},
        searchOptions: {
          pageSize: Number.MAX_SAFE_INTEGER,
          pageNumber: 1
        }
      })
    ]);

    console.log($resumeStore.workExperiences)
  });
</script>

<AdminLayout>
  <div slot="body">
    <div class="d-flex flex-row justify-space-around" style="padding-top: 10px; padding-bottom: 10px;">
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
              await resumeStore.deleteWorkExperiences({ jwt: $userStore.jwt, workExperienceIds: [event.detail.workExperienceId] });
              currentEditingWorkExperience = undefined;
              uiStore.closeAddWorkExperienceDialog();
            }}
            on:onTableRowActionsCellPenIconClick={async (event) => {
              currentEditingWorkExperience = event.detail;
              uiStore.openAddWorkExperienceDialog();
            }}
          />
        {/if}
      </div>
    </div>

    <div class="d-flex flex-row justify-space-around" style="padding-top: 10px; padding-bottom: 10px;">
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
              await resumeStore.deleteSchoolExperiences({ jwt: $userStore.jwt, schoolExperienceIds: [event.detail.schoolExperienceId] });
              currentEditingSchoolExperience = undefined;
              uiStore.closeAddSchoolExperienceDialog();
            }}
            on:onTableRowActionsCellPenIconClick={async (event) => {
              currentEditingSchoolExperience = event.detail;
              uiStore.openAddSchoolExperienceDialog();
            }}
          />
        {/if}
      </div>
    </div>

    <div class="d-flex flex-row justify-space-around" style="padding-top: 10px; padding-bottom: 10px;">
      <div
        style="height: 500px; min-height: 500px; width: 80%;"
        use:watchResize={(node) => {
          certificationsVirtualTableWidth = node.offsetWidth;
          certificationsVirtualTableHeight = node.offsetHeight;
        }}
      >
        {#if certificationsVirtualTableWidth > 0 && certificationsVirtualTableHeight > 0}
          <CertificationsAdminTable
            height={certificationsVirtualTableHeight}
            width={certificationsVirtualTableWidth}
            certifications={$resumeStore.certifications}
            addCertificationDialogActive={$uiStore.isAddCertificationDialogOpen}
            isAddingCertification={$resumeStore.isPuttingCertifications}
            currentEditingCertification={currentEditingCertification}
            on:onAddButtonClick={async (event) => {
              uiStore.openAddCertificationDialog();
            }}
            on:onAddCertificationDialogSubmitButtonClick={async (event) => {
              await resumeStore.putCertifications({ jwt: $userStore.jwt, certifications: [event.detail] });

              if (!$resumeStore.putCertificationsError) {
                uiStore.closeAddCertificationDialog();
                currentEditingCertification = undefined;
              }
            }}
            on:onAddCertificationDialogCloseButtonClick={async (event) => {
              uiStore.closeAddCertificationDialog();
            }}
            on:onAddCertificationDialogOverlayClick={() => {
              currentEditingCertification = undefined;
            }}
            on:onTableRowActionsCellTrashCanIconClick={async (event) => {
              await resumeStore.deleteCertifications({ jwt: $userStore.jwt, certificationIds: [event.detail.certificationId] });
              currentEditingCertification = undefined;
              uiStore.closeAddCertificationDialog();
            }}
            on:onTableRowActionsCellPenIconClick={async (event) => {
              currentEditingCertification = event.detail;
              uiStore.openAddCertificationDialog();
            }}
          />
        {/if}
      </div>
    </div>
  </div>
</AdminLayout>