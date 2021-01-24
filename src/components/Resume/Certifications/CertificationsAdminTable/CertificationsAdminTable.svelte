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
  import CertificationsAdminTableRowDefaultCell from "../CertificationsAdminTableRowDefaultCell/CertificationsAdminTableRowDefaultCell.svelte";
  import CertificationsAdminTableHeaderDefaultCell from "../CertificationsAdminTableHeaderDefaultCell/CertificationsAdminTableHeaderDefaultCell.svelte";
  import CertificationsAdminTableRowAddressCell from "../CertificationsAdminTableRowAddressCell/CertificationsAdminTableRowAddressCell.svelte";
  import CertificationsAdminTableRowDateCell from "../CertificationsAdminTableRowDateCell/CertificationsAdminTableRowDateCell.svelte";
  import CertificationsAdminTableRowActionsCell from '../CertificationsAdminTableRowActionsCell/CertificationsAdminTableRowActionsCell.svelte';
  import AddCertificationDialog from '../AddCertificationDialog/AddCertificationDialog.svelte';

  // props
  export let certifications = [];
  export let addCertificationDialogActive = false;
  export let isAddingCertification = false;
  export let currentEditingCertification = undefined;
  export let width = 0;
  export let height = 0;

  const dispatch = createEventDispatcher();

  function onRefreshButtonClick() {
    dispatch('onRefreshButtonClick', true);
  }

  function onAddButtonClick() {
    dispatch('onAddButtonClick', true);
  }

  function onAddCertificationDialogOverlayClick() {
    dispatch('onAddCertificationDialogOverlayClick', true);
  }

  function onAddCertificationDialogSubmitButtonClick(event) {
    dispatch('onAddCertificationDialogSubmitButtonClick', event.detail);
  }

  function onAddCertificationDialogCloseButtonClick() {
    dispatch('onAddCertificationDialogCloseButtonClick', true);
  }

  function onTableRowActionsCellTrashCanIconClick(data) {
    dispatch('onTableRowActionsCellTrashCanIconClick', data);
  } 

  function onTableRowActionsCellPenIconClick(data) {
    dispatch('onTableRowActionsCellPenIconClick', data);
  }

  let certificationsVirtualTableTitleHeight;
  $: certificationsVirtualTableTitleHeight = 50;
  let certificationsVirtualTableActionsHeight;
  $: certificationsVirtualTableActionsHeight = 50;
  let certificationsVirtualTableHeight;
  $: certificationsVirtualTableHeight = height - (certificationsVirtualTableTitleHeight + certificationsVirtualTableActionsHeight);
  let certificationsVirtualTableColumns = [];
  $: certificationsVirtualTableColumns = [
    {
      display: 'Actions',  // What will be displayed as the column header
      dataName: 'actions',  // The key of a row to get the column's data from
      width: 60,
      cellComponent: CertificationsAdminTableRowActionsCell,
      headerComponent: CertificationsAdminTableHeaderDefaultCell,
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
      cellComponent: CertificationsAdminTableRowDateCell,
      headerComponent: CertificationsAdminTableHeaderDefaultCell
    },
    {
      display: 'End Date',  // What will be displayed as the column header
      dataName: 'endDate',  // The key of a row to get the column's data from
      width: width * .20,
      cellComponent: CertificationsAdminTableRowDateCell,
      headerComponent: CertificationsAdminTableHeaderDefaultCell
    },
    {
      display: 'Institution',  // What will be displayed as the column header
      dataName: 'institution',  // The key of a row to get the column's data from
      width: width * .50,
      cellComponent: CertificationsAdminTableRowDefaultCell,
      headerComponent: CertificationsAdminTableHeaderDefaultCell
    },
    {
      display: 'Name',  // What will be displayed as the column header
      dataName: 'name',  // The key of a row to get the column's data from
      width: width * .50,
      cellComponent: CertificationsAdminTableRowAddressCell,
      headerComponent: CertificationsAdminTableHeaderDefaultCell
    }
  ];
</script>

<Card style="z-index: 0;">
  <CardTitle style="height: {certificationsVirtualTableTitleHeight}px; width: {width}px;">
    Certifications
  </CardTitle>
  <CardText style="height: {certificationsVirtualTableHeight}px; width: {width}px; padding-right: 0px; padding-left: 0px;">
    <VirtualTable
      rowHeight={50}
      rows={certifications}
      columns={certificationsVirtualTableColumns}
    />
  </CardText>
  <CardActions style="height: {certificationsVirtualTableActionsHeight}px; width: {width}px;">
    <Button on:click={onRefreshButtonClick}>Refresh</Button>
    <Button on:click={onAddButtonClick}>Add</Button>
  </CardActions>
</Card>

{#if addCertificationDialogActive}
  {#if currentEditingCertification}
    <AddCertificationDialog
    bind:active={addCertificationDialogActive}
    bind:isAddingCertification={isAddingCertification}
    bind:initialForm={currentEditingCertification}
    on:onOverlayClick={onAddCertificationDialogOverlayClick}
    on:onSubmitButtonClick={onAddCertificationDialogSubmitButtonClick}
    on:onCancelButtonClick={onAddCertificationDialogCloseButtonClick}
    />
  {:else}
    <AddCertificationDialog
      bind:active={addCertificationDialogActive}
      bind:isAddingCertification={isAddingCertification}
      on:onSubmitButtonClick={onAddCertificationDialogSubmitButtonClick}
      on:onCancelButtonClick={onAddCertificationDialogCloseButtonClick}
    />
  {/if}
{/if}