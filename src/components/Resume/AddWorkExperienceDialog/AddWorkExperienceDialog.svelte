<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Textarea, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import { createEventDispatcher  } from 'svelte';
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  export let active = false;
  export let isAddingWorkExperience = true;

  const dispatch = createEventDispatcher();

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      startDate: '',
      endDate: '',
      comapnyName: '',
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
    }),
    onSubmit: values => {
      console.log(values);
      dispatch('onSubmitButtonClick', values);
    }
  });
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
            <Textarea
              id="companyName"
              name="companyName"
              bind:value={$form.companyName}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Company Name
            </Textarea>
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
