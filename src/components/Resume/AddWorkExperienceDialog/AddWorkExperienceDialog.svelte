<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Textarea, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import { createEventDispatcher  } from 'svelte';
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  export let active = false;
  export let isAddingWorkExperience = true;
  export let initialForm = {
    startDate: '',
    endDate: '',
    companyName: '',
    companyAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    position: '',
    duties: [],
    accomplishments: []
  };

  const dispatch = createEventDispatcher();

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: initialForm,
    validationSchema: yup.object().shape({
      startDate: yup
        .string()
        .label('Start Date')
        .required(),
      endDate: yup
        .string()
        .label('End Date')
        .required(),
      companyName: yup
        .string()
        .label('Company Name')
        .required(),
      companyAddress: yup.object().shape({
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
      }).label('Company Address'),
      position: yup
        .string()
        .label('Position')
        .required(),
      accomplishments: yup
        .array()
        .of(yup.string())
        .label('Accomplisments')
        .required()
    }),
    onSubmit: values => {
      dispatch('onSubmitButtonClick', values);
    }
  });

  
  const add = () => {
    $form.accomplishments = $form.accomplishments.concat('');
    $errors.accomplishments = $errors.accomplishments.concat('');
  };

  const remove = i => () => {
    $form.accomplishments = $form.accomplishments.filter((u, j) => j !== i);
    $errors.accomplishments = $errors.accomplishments.filter((u, j) => j !== i);
  };
</script>

<Dialog bind:active>
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
            {#if $errors.companyName}
              <small transition:slide|local style="color: red;">{$errors.companyName}</small>
            {/if}
            <TextField
              id="companyName"
              name="companyName"
              bind:value={$form.companyName}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Company Name
            </TextField>
            {#if $errors.companyAddress.addressLine1}
              <small transition:slide|local style="color: red;">{$errors.companyAddress.addressLine1}</small>
            {/if}
            <TextField
              id="companyAddress.addressLine1"
              name="companyAddress.addressLine1"
              bind:value={$form.companyAddress.addressLine1}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Address Line 1
            </TextField>
            {#if $errors.companyAddress.addressLine2}
              <small transition:slide|local style="color: red;">{$errors.companyAddress.addressLine2}</small>
            {/if}
            <TextField
              id="companyAddress.addressLine2"
              name="companyAddress.addressLine2"
              bind:value={$form.companyAddress.addressLine2}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Address Line 2
            </TextField>
            {#if $errors.companyAddress.city}
              <small transition:slide|local style="color: red;">{$errors.companyAddress.city}</small>
            {/if}
            <TextField
              id="companyAddress.city"
              name="companyAddress.city"
              bind:value={$form.companyAddress.city}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              City
            </TextField>
            {#if $errors.companyAddress.state}
              <small transition:slide|local style="color: red;">{$errors.companyAddress.state}</small>
            {/if}
            <TextField
              id="companyAddress.state"
              name="companyAddress.state"
              bind:value={$form.companyAddress.state}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              State
            </TextField>
            {#if $errors.companyAddress.zipCode}
              <small transition:slide|local style="color: red;">{$errors.companyAddress.zipCode}</small>
            {/if}
            <TextField
              id="companyAddress.zipCode"
              name="companyAddress.zipCode"
              bind:value={$form.companyAddress.zipCode}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Zip Code
            </TextField>
            {#if $errors.position}
              <small transition:slide|local style="color: red;">{$errors.position}</small>
            {/if}
            <TextField
              id="position"
              name="position"
              bind:value={$form.position}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Position
            </TextField>
          </div>
        </div>
      </CardText>
      <CardActions class="justify-end">
        <div class="d-flex flex-row" style="padding-top: 10px;">
          <div style="padding-right: 5px;">
            {#if !isAddingWorkExperience}
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
