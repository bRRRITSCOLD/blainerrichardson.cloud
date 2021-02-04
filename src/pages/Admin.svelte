<script lang="ts">
  // node_modules
  import { watchResize } from "svelte-watch-resize";
  import { onMount } from "svelte";
  import {
    Card,
    Tabs,
    Tab,
    TabContent
  } from 'svelte-materialify/src';

  // layout
  import BaseLayout from "../layouts/BaseLayout.svelte";

  // components
  import WorkExperienceAdminTable from "../components/Resume/WorkExperience/WorkExperienceAdminTable/WorkExperienceAdminTable.svelte";
  import SchoolExperienceAdminTable from "../components/Resume/SchoolExperience/SchoolExperienceAdminTable/SchoolExperienceAdminTable.svelte";
  import CertificationsAdminTable from "../components/Resume/Certifications/CertificationsAdminTable/CertificationsAdminTable.svelte";
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

  let tableNames = {
    WORK_EXPERIENCE: 'Work Experience',
    SCHOOL_EXPERIENCE: 'School Experience',
    CERTIFICATIONS: 'Certifications'
  };

  let tables = [
    { tableName: tableNames.WORK_EXPERIENCE },
    { tableName: tableNames.SCHOOL_EXPERIENCE },
    { tableName: tableNames.CERTIFICATIONS }
  ];

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
      <!-- <Card>
        <Tabs centerActive class="primary-color theme--dark">
          <div slot="tabs">
            {#each tables as table, i}
              <Tab>{table.tableName}</Tab>
            {/each}
          </div>
      
          {#each tables as table, i}
            {#if table.tableName === tableNames.WORK_EXPERIENCE}
              <TabContent>
                <br />
                {table.tableName}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, diam et
                  elementum gravida, arcu mi fermentum nibh, vel dapibus ligula orci non est. Morbi
                  commodo sagittis finibus. Maecenas in volutpat massa. Nullam vulputate metus
                  velit, quis interdum elit imperdiet ut. Suspendisse et sagittis erat, euismod
                  vulputate enim. Etiam feugiat sit amet justo vitae commodo.
                </p>
              </TabContent>
            {:else if table.tableName === tableNames.SCHOOL_EXPERIENCE}
              <TabContent>
                <br />
                {table.tableName}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, diam et
                  elementum gravida, arcu mi fermentum nibh, vel dapibus ligula orci non est. Morbi
                  commodo sagittis finibus. Maecenas in volutpat massa. Nullam vulputate metus
                  velit, quis interdum elit imperdiet ut. Suspendisse et sagittis erat, euismod
                  vulputate enim. Etiam feugiat sit amet justo vitae commodo.
                </p>
              </TabContent>
            {:else if table.tableName === tableNames.CERTIFICATIONS}
              <TabContent>
                <br />
                {table.tableName}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, diam et
                  elementum gravida, arcu mi fermentum nibh, vel dapibus ligula orci non est. Morbi
                  commodo sagittis finibus. Maecenas in volutpat massa. Nullam vulputate metus
                  velit, quis interdum elit imperdiet ut. Suspendisse et sagittis erat, euismod
                  vulputate enim. Etiam feugiat sit amet justo vitae commodo.
                </p>
              </TabContent>
            {/if}
          {/each}
        </Tabs>
      </Card> -->
        <!-- <Card>
          <ResumeAdminTables
            width={workExperiencesVirtualTableWidth}
            height={workExperiencesVirtualTableHeight}
          />
        </Card> -->
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
    
    <!-- <div class="d-flex flex-row justify-space-around" style="padding-top: 10px; padding-bottom: 10px;">
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
    </div> -->
  </div>
</BaseLayout>