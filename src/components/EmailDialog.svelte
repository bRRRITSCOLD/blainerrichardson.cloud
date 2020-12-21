<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Textarea, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import { createEventDispatcher  } from 'svelte';
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  // components

  export let active = false;
  export let isEmailing = true;

  const dispatch = createEventDispatcher();

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      emailAddress: '',
      subject: '',
      body: ''
    },
    validationSchema: yup.object().shape({
      emailAddress: yup
        .string()
        .label('Email Address')
        .email()
        .required(),
      subject: yup.string().label('Subject').required(),
      body: yup
        .string()
        .label('Body')
        .required()
    }),
    onSubmit: values => {
      dispatch('onSendButtonClick', values);
    }
  });
</script>

<Dialog bind:active>
  <Card>
    <form on:submit={handleSubmit}>
      <CardTitle>
        <div class="d-flex flex-row">
          <div>Email</div>
        </div>
      </CardTitle>
      <CardText>
        <div class="d-flex flex-column">
          <div class="d-flex flex-column">
            {#if $errors.emailAddress}
              <small transition:slide|local style="color: red;">{$errors.emailAddress}</small>
            {/if}
            <TextField
              id="emailAddress"
              name="emailAddress"
              bind:value={$form.emailAddress}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Email Address
            </TextField>
            {#if $errors.subject}
              <small transition:slide|local style="color: red;">{$errors.subject}</small>
            {/if}
            <TextField
              id="subject"
              name="subject"
              bind:value={$form.subject}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Subject
            </TextField>
            {#if $errors.body}
              <small transition:slide|local style="color: red;">{$errors.body}</small>
            {/if}
            <Textarea
              id="body"
              name="body"
              bind:value={$form.body}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Body
            </Textarea>
          </div>
        </div>
      </CardText>
      <CardActions class="justify-end">
        <div class="d-flex flex-row" style="padding-top: 10px;">
          <div style="padding-right: 5px;">
            {#if !isEmailing}
              <Button class="primary-color" type="submit">
                Email
              </Button>
            {:else}
              <Button disabled>
                Emailing
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
