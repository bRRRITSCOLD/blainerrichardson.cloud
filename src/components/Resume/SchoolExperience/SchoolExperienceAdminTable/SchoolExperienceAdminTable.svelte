<script lang="ts">
  // node_modules
  import {
    Card,
    CardTitle,
    CardText,
    Button,
    CardActions
  } from 'svelte-materialify/src';
  import { createEventDispatcher } from 'svelte';

  // components
  import VirtualTable from "../../../UI/Table/VirtualTable/VirtualTable.svelte";
  import SchoolExperienceAdminTableRowDefaultCell from "../SchoolExperienceAdminTableRowDefaultCell/SchoolExperienceAdminTableRowDefaultCell.svelte";
  import SchoolExperienceAdminTableHeaderDefaultCell from "../SchoolExperienceAdminTableHeaderDefaultCell/SchoolExperienceAdminTableHeaderDefaultCell.svelte";
  import SchoolExperienceAdminTableRowAddressCell from "../SchoolExperienceAdminTableRowAddressCell/SchoolExperienceAdminTableRowAddressCell.svelte";
  import SchoolExperienceAdminTableRowDateCell from "../SchoolExperienceAdminTableRowDateCell/SchoolExperienceAdminTableRowDateCell.svelte";
  import SchoolExperienceAdminTableRowActionsCell from '../SchoolExperienceAdminTableRowActionsCell/SchoolExperienceAdminTableRowActionsCell.svelte';
  import AddSchoolExperienceDialog from '../../AddSchoolExperienceDialog/AddSchoolExperienceDialog.svelte';

  // props
  export let schoolExperiences = [];
  export let addSchoolExperienceDialogActive = false;
  export let isAddingSchoolExperience = false;
  export let currentEditingSchoolExperience = undefined;
  export let width = 0;
  export let height = 0;

  const dispatch = createEventDispatcher();

  function onRefreshButtonClick() {
    dispatch('onRefreshButtonClick', true);
  }

  function onAddButtonClick() {
    dispatch('onAddButtonClick', true);
  }

  function onAddSchoolExperienceDialogOverlayClick() {
    dispatch('onAddSchoolExperienceDialogOverlayClick', true);
  }

  function onAddSchoolExperienceDialogSubmitButtonClick(event) {
    dispatch('onAddSchoolExperienceDialogSubmitButtonClick', event.detail);
  }

  function onAddSchoolExperienceDialogCloseButtonClick() {
    dispatch('onAddSchoolExperienceDialogCloseButtonClick', true);
  }

  function onTableRowActionsCellTrashCanIconClick(data) {
    dispatch('onTableRowActionsCellTrashCanIconClick', data);
  } 

  function onTableRowActionsCellPenIconClick(data) {
    dispatch('onTableRowActionsCellPenIconClick', data);
  }

  let schoolExperiencesVirtualTableTitleHeight;
  $: schoolExperiencesVirtualTableTitleHeight = 50;
  let schoolExperiencesVirtualTableActionsHeight;
  $: schoolExperiencesVirtualTableActionsHeight = 50;
  let schoolExperiencesVirtualTableHeight;
  $: schoolExperiencesVirtualTableHeight = height - (schoolExperiencesVirtualTableTitleHeight + schoolExperiencesVirtualTableActionsHeight);
  let schoolExperiencesVirtualTableColumns = [];
  $: schoolExperiencesVirtualTableColumns = [
    {
      display: 'Actions',  // What will be displayed as the column header
      dataName: 'actions',  // The key of a row to get the column's data from
      width: 60,
      cellComponent: SchoolExperienceAdminTableRowActionsCell,
      headerComponent: SchoolExperienceAdminTableHeaderDefaultCell,
      handlers: {
        onTrashCanIconLinkClick(data: any) {
          onTableRowActionsCellTrashCanIconClick(data);
        },
        onPenIconLinkClick(data: any) {
          onTableRowActionsCellPenIconClick(data);
        }
      }
    },
    {
      display: 'Start Date',  // What will be displayed as the column header
      dataName: 'startDate',  // The key of a row to get the column's data from
      width: width * .20,
      cellComponent: SchoolExperienceAdminTableRowDateCell,
      headerComponent: SchoolExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'End Date',  // What will be displayed as the column header
      dataName: 'endDate',  // The key of a row to get the column's data from
      width: width * .20,
      cellComponent: SchoolExperienceAdminTableRowDateCell,
      headerComponent: SchoolExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'School Name',  // What will be displayed as the column header
      dataName: 'schoolName',  // The key of a row to get the column's data from
      width: width * .30,
      cellComponent: SchoolExperienceAdminTableRowDefaultCell,
      headerComponent: SchoolExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'School Address',  // What will be displayed as the column header
      dataName: 'schoolAddress',  // The key of a row to get the column's data from
      width: width * .70,
      cellComponent: SchoolExperienceAdminTableRowAddressCell,
      headerComponent: SchoolExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Degree',  // What will be displayed as the column header
      dataName: 'degree',  // The key of a row to get the column's data from
      width: width * .30,
      cellComponent: SchoolExperienceAdminTableRowDefaultCell,
      headerComponent: SchoolExperienceAdminTableHeaderDefaultCell
    },
  ];
</script>

<Card style="z-index: 0;">
  <CardTitle style="height: {schoolExperiencesVirtualTableTitleHeight}px; width: {width}px;">
    Work Experiences
  </CardTitle>
  <CardText style="height: {schoolExperiencesVirtualTableHeight}px; width: {width}px; padding-right: 0px; padding-left: 0px;">
    <VirtualTable
      rowHeight={50}
      rows={schoolExperiences}
      columns={schoolExperiencesVirtualTableColumns}
    />
  </CardText>
  <CardActions style="height: {schoolExperiencesVirtualTableActionsHeight}px; width: {width}px;">
    <Button on:click={onRefreshButtonClick}>Refresh</Button>
    <Button on:click={onAddButtonClick}>Add</Button>
  </CardActions>
</Card>

{#if addSchoolExperienceDialogActive}
  {#if currentEditingSchoolExperience}
    <AddSchoolExperienceDialog
    bind:active={addSchoolExperienceDialogActive}
    bind:isAddingSchoolExperience={isAddingSchoolExperience}
    bind:initialForm={currentEditingSchoolExperience}
    on:onOverlayClick={onAddSchoolExperienceDialogOverlayClick}
    on:onSubmitButtonClick={onAddSchoolExperienceDialogSubmitButtonClick}
    on:onCancelButtonClick={onAddSchoolExperienceDialogCloseButtonClick}
    />
  {:else}
    <AddSchoolExperienceDialog
      bind:active={addSchoolExperienceDialogActive}
      bind:isAddingSchoolExperience={isAddingSchoolExperience}
      on:onSubmitButtonClick={onAddSchoolExperienceDialogSubmitButtonClick}
      on:onCancelButtonClick={onAddSchoolExperienceDialogCloseButtonClick}
    />
  {/if}
{/if}