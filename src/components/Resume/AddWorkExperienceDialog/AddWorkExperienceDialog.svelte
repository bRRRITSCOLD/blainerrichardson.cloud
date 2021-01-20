<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Textarea, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import ExpansionPanels, {
    ExpansionPanel,
  } from 'svelte-materialify/src/components/ExpansionPanels';

  // components
  import Dialog from '../../UI/Dialog/Dialog.svelte';

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
        .of(yup.string().required())
        .label('Accomplisments')
        .required()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
      // dispatch('onSubmitButtonClick', values);
    }
  });

  
  const addAccomplishment = () => {
    $form.accomplishments = $form.accomplishments.concat('');
    $errors.accomplishments = $errors.accomplishments.concat('');
  };

  const removeAccomplishment = i => () => {
    $form.accomplishments = $form.accomplishments.filter((u, j) => j !== i);
    $errors.accomplishments = $errors.accomplishments.filter((u, j) => j !== i);
  };
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
            <div class="d-flex flex-row">
              <label>Accomplishments</label>
              <Button class="primary-color" on:click={addAccomplishment}>
                +
              </Button>
            </div>
            {#each $form.accomplishments as accomplishment, j}
              <div class="d-flex flex-row">
                <div style="width: 80%;">
                  {#if $errors.accomplishments[j]}
                    <small transition:slide|local style="color: red;">{$errors.accomplishments[j]}</small>
                  {/if}
                  <Textarea
                    id="{j}"
                    name="accomplishments[{j}]"
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={$form.accomplishments[j]}
                  />
                </div>

                <Button type="button" on:click={removeAccomplishment(j)}>-</Button>
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
