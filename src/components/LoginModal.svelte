<script lang="ts">
  // node_modules
	import { slide } from 'svelte/transition';
  import { Button, TextField, Textarea, Dialog, Card, CardTitle, CardText, CardActions } from 'svelte-materialify/src';
  import { createEventDispatcher  } from 'svelte';
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  export let active = false;
  export let isLoggingIn = false;

  const dispatch = createEventDispatcher();

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .label('Username')
        .required(),
      password: yup.string().label('Subject').required()
    }),
    onSubmit: values => {
      dispatch('onLoginButtonClick', values);
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
            {#if $errors.username}
              <small transition:slide|local style="color: red;">{$errors.username}</small>
            {/if}
            <TextField
              id="username"
              name="username"
              bind:value={$form.username}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Username
            </TextField>
            {#if $errors.password}
              <small transition:slide|local style="color: red;">{$errors.password}</small>
            {/if}
            <TextField
              id="password"
              name="password"
              type="password"
              bind:value={$form.password}
              on:change={handleChange}
              style="padding-top: 10px;"
            >
              Password
            </TextField>
          </div>
        </div>
      </CardText>
      <CardActions class="justify-end">
        <div class="d-flex flex-row" style="padding-top: 10px;">
          <div style="padding-right: 5px;">
            {#if !isLoggingIn}
              <Button class="primary-color" type="submit">
                Login
              </Button>
            {:else}
              <Button disabled>
                Logging In
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
