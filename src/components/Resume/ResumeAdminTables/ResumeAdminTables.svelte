<script lang="ts">
  // layout
  import { watchResize } from "svelte-watch-resize";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    Tabs,
    Tab,
    TabContent,
    Card,
    CardTitle,
    CardText,
    Button,
    CardActions
  } from 'svelte-materialify/src';

  // components
  import WorkExperienceAdminTable from "../WorkExperience/WorkExperienceAdminTable/WorkExperienceAdminTable.svelte";
  import SchoolExperienceAdminTable from "../SchoolExperience/SchoolExperienceAdminTable/SchoolExperienceAdminTable.svelte";
  import CertificationsAdminTable from "../Certifications/CertificationsAdminTable/CertificationsAdminTable.svelte";

  // stores
  export let workExperiences = [];
  export let schoolExperiences = [];
  export let certifications = [];

  export let addCertificationDialogActive = false;
  export let addWorkExperienceDialogActive = false;
  export let addSchoolExperienceDialogActive = false;

  export let isAddingCertification = false;
  export let isAddingWorkExperience = false;
  export let isAddingSchoolExperience = false;

  export let currentEditingWorkExperience = undefined;
  export let currentEditingSchoolExperience = undefined;
  export let currentEditingCertification = undefined;

  export let width = 0;
  export let height = 0;

  const dispatch = createEventDispatcher();

  let virtualTableTitleHeight;
  $: virtualTableTitleHeight = 50;
  let virtualTableActionsHeight;
  $: virtualTableActionsHeight = 50;
  let virtualTableHeight;
  $: virtualTableHeight = height - (virtualTableTitleHeight + virtualTableActionsHeight);

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

  // Work Experiences
  function onWorkExperiencesTableRefreshButtonClick() {
    dispatch('onWorkExperiencesTableRefreshButtonClick', true);
  }

  function onWorkExperiencesTableAddButtonClick() {
    dispatch('onWorkExperiencesTableAddButtonClick', true);
  }

  function onWorkExperiencesTableAddWorkExperienceDialogOverlayClick() {
    dispatch('onWorkExperiencesTableAddWorkExperienceDialogOverlayClick', true);
  }

  function onWorkExperiencesTableAddWorkExperienceDialogSubmitButtonClick(event) {
    dispatch('onWorkExperiencesTableAddWorkExperienceDialogSubmitButtonClick', event.detail);
  }

  function onWorkExperiencesTableAddWorkExperienceDialogCloseButtonClick() {
    dispatch('onWorkExperiencesTableAddWorkExperienceDialogCloseButtonClick', true);
  }

  function onWorkExperiencesTableRowActionsCellTrashCanIconClick(event) {
    dispatch('onWorkExperiencesTableRowActionsCellTrashCanIconClick', event.detail);
  }

  function onWorkExperiencesTableRowActionsCellPenIconClick(event) {
    dispatch('onWorkExperiencesTableRowActionsCellPenIconClick', event.detail);
  }

  // School Experiences
  function onSchoolExperiencesTableRefreshButtonClick() {
    dispatch('onSchoolExperiencesTableRefreshButtonClick', true);
  }

  function onSchoolExperiencesTableAddButtonClick() {
    dispatch('onSchoolExperiencesTableAddButtonClick', true);
  }

  function onSchoolExperiencesTableAddSchoolExperienceDialogOverlayClick() {
    dispatch('onSchoolExperiencesTableAddSchoolExperienceDialogOverlayClick', true);
  }

  function onSchoolExperiencesTableAddSchoolExperienceDialogSubmitButtonClick(event) {
    dispatch('onSchoolExperiencesTableAddSchoolExperienceDialogSubmitButtonClick', event.detail);
  }

  function onSchoolExperiencesTableAddSchoolExperienceDialogCloseButtonClick() {
    dispatch('onSchoolExperiencesTableAddSchoolExperienceDialogCloseButtonClick', true);
  }

  function onSchoolExperiencesTableRowActionsCellTrashCanIconClick(event) {
    dispatch('onSchoolExperiencesTableRowActionsCellTrashCanIconClick', event.detail);
  }

  function onSchoolExperiencesTableRowActionsCellPenIconClick(event) {
    dispatch('onSchoolExperiencesTableRowActionsCellPenIconClick', event.detail);
  }

  // Certifications
  function onCertificationsTableRefreshButtonClick() {
    dispatch('onCertificationsTableRefreshButtonClick', true);
  }

  function onCertificationsTableAddButtonClick() {
    dispatch('onCertificationsTableAddButtonClick', true);
  }

  function onCertificationsTableAddCertificationDialogOverlayClick() {
    dispatch('onCertificationsTableAddCertificationDialogOverlayClick', true);
  }

  function onCertificationsTableAddCertificationDialogSubmitButtonClick(event) {
    dispatch('onCertificationsTableAddCertificationDialogSubmitButtonClick', event.detail);
  }

  function onCertificationsTableAddCertificationDialogCloseButtonClick() {
    dispatch('onCertificationsTableAddCertificationDialogCloseButtonClick', true);
  }

  function onCertificationsTableRowActionsCellTrashCanIconClick(event) {
    dispatch('onCertificationsTableRowActionsCellTrashCanIconClick', event.detail);
  }

  function onCertificationsTableRowActionsCellPenIconClick(event) {
    dispatch('onCertificationsTableRowActionsCellPenIconClick', event.detail);
  }
</script>

<Card>
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
          <WorkExperienceAdminTable
            height={height}
            width={width}
            workExperiences={workExperiences}
            currentEditingWorkExperience={currentEditingWorkExperience}
            bind:addWorkExperienceDialogActive={addWorkExperienceDialogActive}
            bind:isAddingWorkExperience={isAddingWorkExperience}
            on:onAddWorkExperienceDialogOverlayClick={onWorkExperiencesTableAddWorkExperienceDialogOverlayClick}
            on:onAddWorkExperienceDialogSubmitButtonClick={onWorkExperiencesTableAddWorkExperienceDialogSubmitButtonClick}
            on:onAddWorkExperienceDialogCloseButtonClick={onWorkExperiencesTableAddWorkExperienceDialogCloseButtonClick}
            on:onTableRowActionsCellTrashCanIconClick={onWorkExperiencesTableRowActionsCellTrashCanIconClick}
            on:onTableRowActionsCellPenIconClick={onWorkExperiencesTableRowActionsCellPenIconClick}
            on:onAddButtonClick={onWorkExperiencesTableAddButtonClick}
            on:onRefreshButtonClick={onWorkExperiencesTableRefreshButtonClick}
          />
        </TabContent>
      {:else if table.tableName === tableNames.SCHOOL_EXPERIENCE}
        <TabContent>
          <br />
          <SchoolExperienceAdminTable
            height={height}
            width={width}
            schoolExperiences={schoolExperiences}
            currentEditingSchoolExperience={currentEditingSchoolExperience}
            bind:isAddingSchoolExperience={isAddingSchoolExperience}
            bind:addSchoolExperienceDialogActive={addSchoolExperienceDialogActive}
            on:onAddSchoolExperienceDialogOverlayClick={onSchoolExperiencesTableAddSchoolExperienceDialogOverlayClick}
            on:onAddSchoolExperienceDialogSubmitButtonClick={onSchoolExperiencesTableAddSchoolExperienceDialogSubmitButtonClick}
            on:onAddSchoolExperienceDialogCloseButtonClick={onSchoolExperiencesTableAddSchoolExperienceDialogCloseButtonClick}
            on:onTableRowActionsCellTrashCanIconClick={onSchoolExperiencesTableRowActionsCellTrashCanIconClick}
            on:onTableRowActionsCellPenIconClick={onSchoolExperiencesTableRowActionsCellPenIconClick}
            on:onAddButtonClick={onSchoolExperiencesTableAddButtonClick}
            on:onRefreshButtonClick={onSchoolExperiencesTableRefreshButtonClick}
          />
        </TabContent>
      {:else if table.tableName === tableNames.CERTIFICATIONS}
        <TabContent>
          <br />
          <CertificationsAdminTable
            height={height}
            width={width}
            certifications={certifications}
            currentEditingCertification={currentEditingCertification}
            bind:addCertificationDialogActive={addCertificationDialogActive}
            bind:isAddingCertification={isAddingCertification}
            on:onAddCertificationDialogOverlayClick={onCertificationsTableAddCertificationDialogOverlayClick}
            on:onAddCertificationDialogSubmitButtonClick={onCertificationsTableAddCertificationDialogSubmitButtonClick}
            on:onAddCertificationDialogCloseButtonClick={onCertificationsTableAddCertificationDialogCloseButtonClick}
            on:onTableRowActionsCellTrashCanIconClick={onCertificationsTableRowActionsCellTrashCanIconClick}
            on:onTableRowActionsCellPenIconClick={onCertificationsTableRowActionsCellPenIconClick}
            on:onAddButtonClick={onCertificationsTableAddButtonClick}
            on:onRefreshButtonClick={onCertificationsTableRefreshButtonClick}
          />
        </TabContent>
      {/if}
    {/each}
  </Tabs>
</Card>