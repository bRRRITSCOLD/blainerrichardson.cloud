<script>
  // node_modules
  import { AppBar, Button, Icon, Menu, ListItem } from 'svelte-materialify/src';
  import { mdiDotsVertical } from '@mdi/js';
  import { createEventDispatcher  } from 'svelte';
  import { push } from 'svelte-spa-router';

  // components
  import LoginModal from '../components/LoginModal.svelte';

  // stores
  import { uiStore } from '../stores/ui';
  import { userStore } from '../stores/user';
</script>

<AppBar flat style="width: 100%; background-color: white;">
  <div style="flex-grow:1" />
  <Menu right>
    <div slot="activator">
      <Button fab depressed>
        <Icon path={mdiDotsVertical} />
      </Button>
    </div>
    {#if !$userStore.isAuthenticated}
      <ListItem style="padding: 0px;"><Button on:click={() => {
        // dispatch('onLoginButtonClick', true);
        uiStore.openLoginModal();
      }}>Login</Button></ListItem>
    {:else}
      <ListItem style="padding: 0px;"><Button on:click={() => {
        // cleasr and reset all user data
        userStore.reset();

        // navigate the user to the home page
        push('/');
      }}>Logout</Button></ListItem>
    {/if}
  </Menu>
</AppBar>

<LoginModal
  bind:active={$uiStore.isLoginModalOpen}
  bind:isLoggingIn={$userStore.isAuthenticatingUser}
  on:onLoginButtonClick={async (event) => {
    // create request to api
    const authenticateUserRequest = {
      username: event.detail.username,
      password: event.detail.password
    };
    
    // call store thunk and send email
    await userStore.authenticateUser(authenticateUserRequest);

    // indicate that the dialog
    // is not to be open now
    uiStore.closeLoginModal();

    // reroute user to dashboard
    // TODO: reroute to dashboard/admin (build Dashboard/Admin page)
    push('/admin');
  }}
  on:onCancelButtonClick={() => {
    uiStore.closeLoginModal();
  }}
/>

<slot name="body" />