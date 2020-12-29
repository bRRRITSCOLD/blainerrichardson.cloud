<script lang="ts">
  // node_modules
  import { MaterialApp } from 'svelte-materialify/src'
  import Router from 'svelte-spa-router';

  // store specific
  import { uiStore } from './stores/ui';
  import { userStore } from './stores/user';

  // components
  import NavBar from './components/NavBar.svelte';

  // routes
  import routes from './routes';

</script>

<MaterialApp>
  <NavBar
    loginModalActive={$uiStore.isLoginModalOpen}
    on:onLoginButtonClick={() => {
      uiStore.openLoginModal();
    }}
    on:onLoginModalLoginButtonClick={async (event) => {
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
    }}
    on:onLoginModalCancelButtonClick={() => {
      uiStore.closeLoginModal();
    }}
    isLoggingIn={$userStore.isAuthenticatingUser}
  />
  <Router {routes}/>
</MaterialApp>

<style>
</style>
