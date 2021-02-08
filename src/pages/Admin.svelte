<script lang="ts">
  // node_modules
  import { watchResize } from "svelte-watch-resize";
  import { onMount } from "svelte";

  // layout
  import BaseLayout from "../layouts/BaseLayout.svelte";

  // components
  import ResumeAdminTables from "../components/Resume/ResumeAdminTables/ResumeAdminTables.svelte";

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

  let virtualTableTitleHeight;
  $: virtualTableTitleHeight = 50;
  let virtualTableActionsHeight;
  $: virtualTableActionsHeight = 50;
  let virtualTableHeight;
  $: virtualTableHeight = 500 - (virtualTableTitleHeight + virtualTableActionsHeight);

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

<BaseLayout>
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
          <ResumeAdminTables
            width={workExperiencesVirtualTableWidth}
            height={workExperiencesVirtualTableHeight}

            workExperiences={$resumeStore.workExperiences}
            bind:addWorkExperienceDialogActive={$uiStore.isAddWorkExperienceDialogOpen}
            isAddingWorkExperience={$resumeStore.isPuttingWorkExperiences}
            currentEditingWorkExperience={currentEditingWorkExperience}
            on:onWorkExperiencesTableAddWorkExperienceDialogOverlayClick={() => {
              currentEditingWorkExperience = undefined;
            }}
            on:onWorkExperiencesTableAddWorkExperienceDialogSubmitButtonClick={async (event) => {
              await resumeStore.putWorkExperiences({ jwt: $userStore.jwt, workExperiences: [event.detail] });

              if (!$resumeStore.putWorkExperiencesError) {
                uiStore.closeAddWorkExperienceDialog();
                currentEditingWorkExperience = undefined;
              }
            }}
            on:onWorkExperiencesTableAddWorkExperienceDialogCloseButtonClick={async (event) => {
              uiStore.closeAddWorkExperienceDialog();
            }}
            on:onWorkExperiencesTableRowActionsCellTrashCanIconClick={async (event) => {
              await resumeStore.deleteWorkExperiences({ jwt: $userStore.jwt, workExperienceIds: [event.detail.workExperienceId] });
              currentEditingWorkExperience = undefined;
              uiStore.closeAddWorkExperienceDialog();
            }}
            on:onWorkExperiencesTableRowActionsCellPenIconClick={async (event) => {
              currentEditingWorkExperience = event.detail;
              uiStore.openAddWorkExperienceDialog();
            }}
            on:onWorkExperiencesTableAddButtonClick={async (event) => {
              uiStore.openAddWorkExperienceDialog();
            }}
            on:onWorkExperiencesTableRefreshButtonClick={async () => {
              await resumeStore.searchWorkExperiences({
                searchCriteria: {},
                searchOptions: {
                  pageSize: Number.MAX_SAFE_INTEGER,
                  pageNumber: 1
                }
              });
            }}

            schoolExperiences={$resumeStore.schoolExperiences}
            addSchoolExperienceDialogActive={$uiStore.isAddSchoolExperienceDialogOpen}
            isAddingSchoolExperience={$resumeStore.isPuttingSchoolExperiences}
            currentEditingSchoolExperience={currentEditingSchoolExperience}
            on:onSchoolExperiencesTableAddSchoolExperienceDialogOverlayClick={() => {
              currentEditingSchoolExperience = undefined;
            }}
            on:onSchoolExperiencesTableAddSchoolExperienceDialogSubmitButtonClick={async (event) => {
              await resumeStore.putSchoolExperiences({ jwt: $userStore.jwt, schoolExperiences: [event.detail] });

              if (!$resumeStore.putSchoolExperiencesError) {
                uiStore.closeAddSchoolExperienceDialog();
                currentEditingSchoolExperience = undefined;
              }
            }}
            on:onSchoolExperiencesTableAddSchoolExperienceDialogCloseButtonClick={async (event) => {
              uiStore.closeAddSchoolExperienceDialog();
            }}
            on:onSchoolExperiencesTableRowActionsCellTrashCanIconClick={async (event) => {
              await resumeStore.deleteSchoolExperiences({ jwt: $userStore.jwt, schoolExperienceIds: [event.detail.schoolExperienceId] });
              currentEditingSchoolExperience = undefined;
              uiStore.closeAddSchoolExperienceDialog();
            }}
            on:onSchoolExperiencesTableRowActionsCellPenIconClick={async (event) => {
              currentEditingSchoolExperience = event.detail;
              uiStore.openAddSchoolExperienceDialog();
            }}
            on:onSchoolExperiencesTableAddButtonClick={async (event) => {
              uiStore.openAddSchoolExperienceDialog();
            }}
            on:onSchoolExperiencesTableRefreshButtonClick={async () => {
              await resumeStore.searchSchoolExperiences({
                searchCriteria: {},
                searchOptions: {
                  pageSize: Number.MAX_SAFE_INTEGER,
                  pageNumber: 1
                }
              });
            }}

            certifications={$resumeStore.certifications}
            addCertificationDialogActive={$uiStore.isAddCertificationDialogOpen}
            isAddingCertification={$resumeStore.isPuttingCertifications}
            currentEditingCertification={currentEditingCertification}
            on:onCertificationsTableAddCertificationDialogOverlayClick={() => {
              currentEditingCertification = undefined;
            }}
            on:onCertificationsTableAddCertificationDialogSubmitButtonClick={async (event) => {
              await resumeStore.putCertifications({ jwt: $userStore.jwt, certifications: [event.detail] });

              if (!$resumeStore.putCertificationsError) {
                uiStore.closeAddCertificationDialog();
                currentEditingCertification = undefined;
              }
            }}
            on:onCertificationsTableAddCertificationDialogCloseButtonClick={async (event) => {
              uiStore.closeAddCertificationDialog();
            }}
            on:onCertificationsTableRowActionsCellTrashCanIconClick={async (event) => {
              await resumeStore.deleteCertifications({ jwt: $userStore.jwt, certificationIds: [event.detail.certificationId] });
              currentEditingCertification = undefined;
              uiStore.closeAddCertificationDialog();
            }}
            on:onCertificationsTableRowActionsCellPenIconClick={async (event) => {
              currentEditingCertification = event.detail;
              uiStore.openAddCertificationDialog();
            }}
            on:onCertificationsTableAddButtonClick={async (event) => {
              uiStore.openAddCertificationDialog();
            }}
            on:onCertificationsTableRefreshButtonClick={async () => {
              await resumeStore.searchCertifications({
                searchCriteria: {},
                searchOptions: {
                  pageSize: Number.MAX_SAFE_INTEGER,
                  pageNumber: 1
                }
              });
            }}
          />
        {/if}
      </div>
    </div>
  </div>
</BaseLayout>