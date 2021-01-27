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
  export let isAddingCertification = true;
  export let initialForm = undefined;

  const dispatch = createEventDispatcher();

  const { form, errors, handleChange, handleSubmit, setForm } = createForm({
    initialValues: {
      startDate: '',
      endDate: '',
      institution: '',
      name: ''
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
      institution: yup
        .string()
        .label('Institution')
        .required(),
      name: yup
        .string()
        .label('Name')
        .required()
    }),
    onSubmit: values => {
      dispatch('onSubmitButtonClick', values);
    }
  });

  onMount(() => {
    if (initialForm) {
      setForm(initialForm);
    };
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

            {#if $errors.institution}
              <small transition:slide|local style="color: red;">{$errors.institution}</small>
            {/if}
            <TextField
              id="institution"
              name="institution"
              bind:value={$form.institution}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Institution
            </TextField>

            {#if $errors.name}
              <small transition:slide|local style="color: red;">{$errors.name}</small>
            {/if}
            <TextField
              id="name"
              name="name"
              bind:value={$form.name}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Name
            </TextField>
          </div>
        </div>
      </CardText>
      <CardActions class="justify-end">
        <div class="d-flex flex-row" style="padding-top: 10px;">
          <div style="padding-right: 5px;">
            {#if !isAddingCertification}
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
