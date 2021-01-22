<script lang="ts">
  // node_modules
  import {
    Card,
    CardTitle,
    CardText,
    Button,
    CardActions
  } from 'svelte-materialify/src';
  import { createEventDispatcher, onDestroy  } from 'svelte';

  // components
  import VirtualTable from "../../../UI/Table/VirtualTable/VirtualTable.svelte";
  import WorkExperienceAdminTableRowDefaultCell from "../WorkExperienceAdminTableRowDefaultCell/WorkExperienceAdminTableRowDefaultCell.svelte";
  import WorkExperienceAdminTableHeaderDefaultCell from "../WorkExperienceAdminTableHeaderDefaultCell/WorkExperienceAdminTableHeaderDefaultCell.svelte";
  import WorkExperienceAdminTableRowAddressCell from "../WorkExperienceAdminTableRowAddressCell/WorkExperienceAdminTableRowAddressCell.svelte";
  import WorkExperienceAdminTableRowDateCell from "../WorkExperienceAdminTableRowDateCell/WorkExperienceAdminTableRowDateCell.svelte";
  import WorkExperienceAdminTableRowActionsCell from '../WorkExperienceAdminTableRowActionsCell/WorkExperienceAdminTableRowActionsCell.svelte';
  import AddWorkExperienceDialog from '../../AddWorkExperienceDialog/AddWorkExperienceDialog.svelte';

  // props
  export let workExperiences = [];
  export let addWorkExperienceDialogActive = false;
  export let isAddingWorkExperience = false;
  export let currentEditingWorkExperience = undefined;
  export let width = 0;
  export let height = 0;

  const dispatch = createEventDispatcher();

  let workExperiencesVirtualTableColumns = [];
  $: workExperiencesVirtualTableColumns = [
    {
      display: 'Actions',  // What will be displayed as the column header
      dataName: 'actions',  // The key of a row to get the column's data from
      width: 60,
      cellComponent: WorkExperienceAdminTableRowActionsCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell,
      handlers: {
        onTrashCanIconLinkClick(data: any) {
          console.log('onTrashCanIconLink', data);
          dispatch('onTableRowActionsCellTrashCanIconClick', data);
        },
        onPenIconLinkClick(data: any) {
          console.log('onPenIconLink', data);
          dispatch('onTableRowActionsCellPenIconClick', data);
        }
      }
    },
    {
      display: 'Start Date',  // What will be displayed as the column header
      dataName: 'startDate',  // The key of a row to get the column's data from
      width: width * .20,
      cellComponent: WorkExperienceAdminTableRowDateCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'End Date',  // What will be displayed as the column header
      dataName: 'endDate',  // The key of a row to get the column's data from
      width: width * .20,
      cellComponent: WorkExperienceAdminTableRowDateCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Company Name',  // What will be displayed as the column header
      dataName: 'companyName',  // The key of a row to get the column's data from
      width: width * .30,
      cellComponent: WorkExperienceAdminTableRowDefaultCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Company Address',  // What will be displayed as the column header
      dataName: 'companyAddress',  // The key of a row to get the column's data from
      width: width * .70,
      cellComponent: WorkExperienceAdminTableRowAddressCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
    {
      display: 'Position',  // What will be displayed as the column header
      dataName: 'position',  // The key of a row to get the column's data from
      width: width * .30,
      cellComponent: WorkExperienceAdminTableRowDefaultCell,
      headerComponent: WorkExperienceAdminTableHeaderDefaultCell
    },
  ];

  let workExperiencesVirtualTableTitleHeight;
  $: workExperiencesVirtualTableTitleHeight = 50;
  let workExperiencesVirtualTableActionsHeight;
  $: workExperiencesVirtualTableActionsHeight = 50;
  let workExperiencesVirtualTableHeight;
  $: workExperiencesVirtualTableHeight = height - (workExperiencesVirtualTableTitleHeight + workExperiencesVirtualTableActionsHeight);
</script>

<Card style="z-index: 0;">
  <CardTitle style="height: {workExperiencesVirtualTableTitleHeight}px; width: {width}px;">
    Work Experiences
  </CardTitle>
  <CardText style="height: {workExperiencesVirtualTableHeight}px; width: {width}px; padding-right: 0px; padding-left: 0px;">
    <VirtualTable
      rowHeight={50}
      rows={workExperiences}
      columns={workExperiencesVirtualTableColumns}
    />
  </CardText>
  <CardActions style="height: {workExperiencesVirtualTableActionsHeight}px; width: {width}px;">
    <Button on:click={() => {
      dispatch('onRefreshButtonClick', true);
    }}>Refresh</Button>
    <Button on:click={() => {
      dispatch('onAddButtonClick', true);
    }}>Add</Button>
  </CardActions>
</Card>

{#if addWorkExperienceDialogActive}
  {#if currentEditingWorkExperience}
    <AddWorkExperienceDialog
    bind:active={addWorkExperienceDialogActive}
    bind:isAddingWorkExperience={isAddingWorkExperience}
    bind:initialForm={currentEditingWorkExperience}
    on:onOverlayClick={() => {
      dispatch('onAddWorkExperienceDialogOverlayClick', true);
    }}
    on:onSubmitButtonClick={(event => {
      dispatch('onAddWorkExperienceDialogSubmitButtonClick', event.detail);
    })}
    on:onCancelButtonClick={() => {
      dispatch('onAddWorkExperienceDialogCloseButtonClick', true);
    }}
    />
  {:else}
    <AddWorkExperienceDialog
      bind:active={addWorkExperienceDialogActive}
      bind:isAddingWorkExperience={isAddingWorkExperience}
      on:onSubmitButtonClick={(event => {
        dispatch('onAddWorkExperienceDialogSubmitButtonClick', event.detail);
      })}
      on:onCancelButtonClick={() => {
        dispatch('onAddWorkExperienceDialogCloseButtonClick', true);
      }}
    />
  {/if}
{/if}