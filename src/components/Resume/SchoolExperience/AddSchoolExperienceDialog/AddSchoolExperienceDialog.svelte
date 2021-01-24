<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import * as yup from "yup";
  import { createEventDispatcher, onMount  } from 'svelte';

  // components
  import Dialog from '../../../UI/Dialog/Dialog.svelte';

  // libraries
  import { _ } from '../../../../lib/utils';
  import { createForm } from '../../../../lib/form';

  export let active = false;
  export let isAddingSchoolExperience = true;
  export let initialForm = undefined;

  let currentClass;
  let currentClassError;
  $: if (_.isString(currentClass)) {
    if (currentClass.length > 0) {
      currentClassError = undefined;
    }
  }

  const dispatch = createEventDispatcher();

  const { form, errors, state, handleChange, handleSubmit, updateInitialValues, setForm } = createForm({
    initialValues: {
      startDate: '',
      endDate: '',
      schoolName: '',
      schoolAddress: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: ''
      },
      degree: '',
      classes: []
    },
    validationSchema: yup.object().shape({
      startDate: yup
        .string()
        .label('Start Date')
        .required(),
      endDate: yup
        .string()
        .label('End Date')
        .required(),
      schoolName: yup
        .string()
        .label('School Name')
        .required(),
      schoolAddress: yup.object().shape({
        addressLine1: yup
          .string()
          .label('Address Line 1')
          .required(),
        addressLine2: yup
          .string()
          .label('Address Line 2')
          .optional(),
        city: yup
          .string()
          .label('City')
          .required(),
        state: yup
          .string()
          .label('State')
          .required(),
        zipCode: yup
          .string()
          .label('Zip Code')
          .required(),
      }).label('School Address'),
      degree: yup
        .string()
        .label('Degree')
        .required(),
      classes: yup
        .array()
        .of(yup.string().label('Class').required())
        .label('Classes')
        .required()
    }),
    onSubmit: values => {
      dispatch('onSubmitButtonClick', values);
    }
  });

  const addClass = () => {
    if (!_.isString(currentClass) || (_.isString(currentClass) && currentClass.length === 0)) {
      currentClassError = 'Class is required.'
      return;
    }
    $form.classes = $form.classes.concat(currentClass);
    $errors.classes = $errors.classes.concat('');
    currentClass = '';
    currentClassError = '';
  };

  const removeClass = i => () => {
    $form.classes = $form.classes.filter((u, j) => j !== i);
    $errors.classes = $errors.classes.filter((u, j) => j !== i);
  };

  onMount(() => {
    if (initialForm) {
      setForm(initialForm);
    };
    console.log('initialForm=', initialForm);
  })
</script>

<Dialog bind:active on:onOverlayClick>
  <Card>
    <form on:submit={handleSubmit}>
      <CardTitle>
        <div class="d-flex flex-row">
          <div>Work Experience</div>
        </div>
      </CardTitle>
      <CardText>
        <div class="d-flex flex-column">
          <div class="d-flex flex-column">
            {#if $errors.startDate}
              <small transition:slide|local style="color: red;">{$errors.startDate}</small>
            {/if}
            <TextField
              id="startDate"
              name="startDate"
              bind:value={$form.startDate}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Start Date
            </TextField>
            {#if $errors.endDate}
              <small transition:slide|local style="color: red;">{$errors.endDate}</small>
            {/if}
            <TextField
              id="endDate"
              name="endDate"
              bind:value={$form.endDate}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              End Date
            </TextField>
            {#if $errors.schoolName}
              <small transition:slide|local style="color: red;">{$errors.schoolName}</small>
            {/if}
            <TextField
              id="schoolName"
              name="schoolName"
              bind:value={$form.schoolName}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              School Name
            </TextField>
            {#if $errors.schoolAddress.addressLine1}
              <small transition:slide|local style="color: red;">{$errors.schoolAddress.addressLine1}</small>
            {/if}
            <TextField
              id="schoolAddress.addressLine1"
              name="schoolAddress.addressLine1"
              bind:value={$form.schoolAddress.addressLine1}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Address Line 1
            </TextField>
            {#if $errors.schoolAddress.addressLine2}
              <small transition:slide|local style="color: red;">{$errors.schoolAddress.addressLine2}</small>
            {/if}
            <TextField
              id="schoolAddress.addressLine2"
              name="schoolAddress.addressLine2"
              bind:value={$form.schoolAddress.addressLine2}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Address Line 2
            </TextField>
            {#if $errors.schoolAddress.city}
              <small transition:slide|local style="color: red;">{$errors.schoolAddress.city}</small>
            {/if}
            <TextField
              id="schoolAddress.city"
              name="schoolAddress.city"
              bind:value={$form.schoolAddress.city}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              City
            </TextField>
            {#if $errors.schoolAddress.state}
              <small transition:slide|local style="color: red;">{$errors.schoolAddress.state}</small>
            {/if}
            <TextField
              id="schoolAddress.state"
              name="schoolAddress.state"
              bind:value={$form.schoolAddress.state}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              State
            </TextField>
            {#if $errors.schoolAddress.zipCode}
              <small transition:slide|local style="color: red;">{$errors.schoolAddress.zipCode}</small>
            {/if}
            <TextField
              id="schoolAddress.zipCode"
              name="schoolAddress.zipCode"
              bind:value={$form.schoolAddress.zipCode}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Zip Code
            </TextField>
            {#if $errors.degree}
              <small transition:slide|local style="color: red;">{$errors.degree}</small>
            {/if}
            <TextField
              id="degree"
              name="degree"
              bind:value={$form.degree}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Degree
            </TextField>

            {#if currentClassError}
              <small transition:slide|local style="color: red;">{currentClassError}</small>
            {/if}
            <div class="d-flex flex-row">
              <TextField
                bind:value={currentClass}
                style="padding-top: 10px;"
              >
                Class
              </TextField>
              <Button class="primary-color" on:click={addClass}>
                +
              </Button>
            </div>
            {#each $form.classes as duty, j}
              <div class="d-flex flex-row">
                <div style="width: 80%;">
                  {#if $errors.classes[j]}
                    <small transition:slide|local style="color: red;">{JSON.stringify($errors.classes[j])}</small>
                  {/if}
                  {$form.classes[j]}
                </div>

                <Button type="button" on:click={removeClass(j)}>-</Button>
              </div>
            {/each}
          </div>
        </div>
      </CardText>
      <CardActions class="justify-end">
        <div class="d-flex flex-row" style="padding-top: 10px;">
          <div style="padding-right: 5px;">
            {#if !isAddingSchoolExperience}
              <Button class="primary-color" type="submit">
                Submit
              </Button>
            {:else}
              <Button disabled>
                Submitting
              </Button>
            {/if}
          </div>
          <div>
            <Button
              class="secondary-color"
              on:click={() => {
                dispatch('onCancelButtonClick', true);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardActions>
    </form>
  </Card>
</Dialog>
