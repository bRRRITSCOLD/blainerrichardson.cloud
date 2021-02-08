<script>
  // node_modules
  import { Button, Icon, ListItem } from 'svelte-materialify/src';
  import { mdiDotsVertical } from '@mdi/js';
  import { push } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';

  // components
  import LoginDialog from '../components/User/LoginDialog/LoginDialog.svelte';
  import NavigationBar from '../components/UI/Navigation/NavigationBar/NavigationBar.svelte';
  import NavigationMenu from '../components/UI/Navigation/NavigationMenu/NavigationMenu.svelte';

  // stores
  import { uiStore } from '../stores/ui';
  import { userStore } from '../stores/user';
</script>

<NavigationBar>
  <div style="flex-grow:1" />
  <NavigationMenu>
    <div slot="activator">
      <Button fab depressed>
        <Icon path={mdiDotsVertical} />
      </Button>
    </div>

    <!-- svelte-ignore a11y-missing-attribute -->
    <span on:click={() => {
      push('/home');
    }}>
      <ListItem style="padding: 10px;"><a use:active={{ path: '/home' }}>Home</a></ListItem>
    </span>

    {#if !$userStore.isAuthenticated}
      <!-- svelte-ignore a11y-missing-attribute -->
      <span on:click={() => {
        // dispatch('onLoginButtonClick', true);
        uiStore.openLoginDialog();
      }}>
        <ListItem style="padding: 10px;"><a>Login</a></ListItem>
      </span>
    {:else}

      <!-- svelte-ignore a11y-missing-attribute -->
      <span on:click={() => {
        push('/admin');
      }}>
        <ListItem style="padding: 10px;"><a use:active={{ path: '/admin' }}>Admin</a></ListItem>
      </span>

      <!-- svelte-ignore a11y-missing-attribute -->
      <span on:click={async () => {
        // cleasr and reset all user data
        userStore.reset();

        // logout/unauthenticate a user
        await userStore.unauthenticateUser();

        // navigate the user to the home page
        push('/home');
      }}>
        <ListItem style="padding: 10px;"><a>Logout</a></ListItem>
      </span>
    {/if}
  </NavigationMenu>
</NavigationBar>
<!-- <a href="/hello/user" use:link use:active={{path: '/hello/*', className: 'active', inactiveClassName: 'inactive'}}>Say hi!</a>
<a href="/hello/user" use:link use:active={'/hello/*'}>Say hi with a default className!</a>
<a href="/hello/user" use:link use:active>Say hi with all default options!</a> -->
{#if $uiStore.isLoginDialogOpen}
  <LoginDialog
    bind:active={$uiStore.isLoginDialogOpen}
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
      uiStore.closeLoginDialog();

      // reroute user to dashboard
      // TODO: reroute to dashboard/admin (build Dashboard/Admin page)
      push('/admin');
    }}
    on:onCancelButtonClick={() => {
      uiStore.closeLoginDialog();
    }}
  />
{/if}

<slot name="body" />