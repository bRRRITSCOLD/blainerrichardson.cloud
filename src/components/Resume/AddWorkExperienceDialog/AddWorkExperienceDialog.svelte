<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Textarea, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import { createEventDispatcher, onMount  } from 'svelte';
  import * as yup from "yup";

  // libraries
  import { _ } from '../../../lib/utils';
  import { createForm } from '../../../lib/form';

  // components
  import Dialog from '../../UI/Dialog/Dialog.svelte';

  // props
  export let active = false;
  export let isAddingWorkExperience = true;
  export let initialForm = undefined;

  let currentAccomplishment;
  let currentAccomplishmentError;
  $: if (_.isString(currentAccomplishment)) {
    if (currentAccomplishment.length > 0) {
      currentAccomplishmentError = undefined;
    }
  }

  let currentDuty;
  let currentDutyError;
  $: if (_.isString(currentDuty)) {
    if (currentDuty.length > 0) {
      currentDutyError = undefined;
    }
  }
  const dispatch = createEventDispatcher();

  const { form, errors, state, handleChange, handleSubmit, updateInitialValues, setForm } = createForm({
    initialValues: {
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
      accomplishments: yup
        .array()
        .of(yup.string().label('Accomplishment').required())
        .label('Accomplisments')
        .required(),
      duties: yup
        .array()
        .of(yup.string().label('Duty').required())
        .label('Accomplisments')
        .required()
    }),
    onSubmit: values => {
      dispatch('onSubmitButtonClick', values);
    }
  });

  function addAccomplishment() {
    if (!_.isString(currentAccomplishment) || (_.isString(currentAccomplishment) && currentAccomplishment.length === 0)) {
      currentAccomplishmentError = 'Accomplishment is required.'
      return;
    }
    $form.accomplishments = $form.accomplishments.concat(currentAccomplishment);
    $errors.accomplishments = $errors.accomplishments.concat('');
    currentAccomplishment = '';
    currentAccomplishmentError = '';
  };

  function removeAccomplishment(i) {
    return function () {
      $form.accomplishments = $form.accomplishments.filter((u, j) => j !== i);
      $errors.accomplishments = $errors.accomplishments.filter((u, j) => j !== i);
    };
  } 

  function addDuty() {
    if (!_.isString(currentDuty) || (_.isString(currentDuty) && currentDuty.length === 0)) {
      currentDutyError = 'Duty is required.'
      return;
    }
    $form.duties = $form.duties.concat(currentDuty);
    $errors.duties = $errors.duties.concat('');
    currentDuty = '';
    currentDutyError = '';
  };

  function removeDuty(i) {
    return function() {
      $form.duties = $form.duties.filter((u, j) => j !== i);
      $errors.duties = $errors.duties.filter((u, j) => j !== i);
    }
  }

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
            {#if currentAccomplishmentError}
              <small transition:slide|local style="color: red;">{currentAccomplishmentError}</small>
            {/if}
            <div class="d-flex flex-row">
              <TextField
                bind:value={currentAccomplishment}
                style="padding-top: 10px;"
              >
                Acomplishment
              </TextField>
              <Button class="primary-color" on:click={addAccomplishment}>
                +
              </Button>
            </div>
            {#each $form.accomplishments as accomplishment, j}
              <div class="d-flex flex-row">
                <div style="width: 80%;">
                  {#if $errors.accomplishments[j]}
                    <small transition:slide|local style="color: red;">{JSON.stringify($errors.accomplishments[j])}</small>
                  {/if}
                  {$form.accomplishments[j]}
                </div>

                <Button type="button" on:click={removeAccomplishment(j)}>-</Button>
              </div>
            {/each}

            {#if currentDutyError}
              <small transition:slide|local style="color: red;">{currentDutyError}</small>
            {/if}
            <div class="d-flex flex-row">
              <TextField
                bind:value={currentDuty}
                style="padding-top: 10px;"
              >
                Duty
              </TextField>
              <Button class="primary-color" on:click={addDuty}>
                +
              </Button>
            </div>
            {#each $form.duties as duty, j}
              <div class="d-flex flex-row">
                <div style="width: 80%;">
                  {#if $errors.duties[j]}
                    <small transition:slide|local style="color: red;">{JSON.stringify($errors.duties[j])}</small>
                  {/if}
                  {$form.duties[j]}
                </div>

                <Button type="button" on:click={removeDuty(j)}>-</Button>
              </div>
            {/each}
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
<!-- 


<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  const {
    form,
    errors,
    state,
    handleChange,
    handleSubmit,
    handleReset
  } = createForm({
    initialValues: {
      users: [
        {
          name: "",
          email: ""
        }
      ]
    },
    validationSchema: yup.object().shape({
      users: yup.array().of(
        yup.object().shape({
          name: yup.string().required(),
          email: yup
            .string()
            .email()
            .required()
        })
      )
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
    }
  });

  const add = () => {
    $form.users = $form.users.concat({ name: "", email: "" });
    $errors.users = $errors.users.concat({ name: "", email: "" });
  };

  const remove = i => () => {
    $form.users = $form.users.filter((u, j) => j !== i);
    $errors.users = $errors.users.filter((u, j) => j !== i);
  };
</script>

<style>
  .error {
    display: block;
    color: red;
  }
  .form-group {
    display: flex;
    align-items: baseline;
  }
  .button-group {
    display: flex;
  }
  button ~ button {
    margin-left: 15px;
  }
</style>

<form>
  <h1>Add users</h1>

  {#each $form.users as user, j}
    <div class="form-group">
      <div>
        <input
          name={`users[${j}].name`}
          placeholder="name"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.users[j].name}
        />
        {#if $errors.users[j].name}
          <small class="error">{$errors.users[j].name}</small>
        {/if}
      </div>

      <div>
        <input
          placeholder="email"
          name={`users[${j}].email`}
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.users[j].email}
        />
        {#if $errors.users[j].email}
          <small class="error">{$errors.users[j].email}</small>
        {/if}
      </div>

      {#if j === $form.users.length - 1}
        <button type="button" on:click={add}>+</button>
      {/if}
      {#if $form.users.length !== 1}
        <button type="button" on:click={remove(j)}>-</button>
      {/if}
    </div>
  {/each}

  <div class="button-group">
    <button type="button" on:click={handleSubmit}>submit</button>
    <button type="button" on:click={handleReset}>reset</button>
  </div>
</form> -->
