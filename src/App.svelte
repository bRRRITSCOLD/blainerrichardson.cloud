<script lang="ts">
  // node_modules
  import { onDestroy, onMount } from 'svelte';
  import { MaterialApp } from 'svelte-materialify/src'
  import Router, { replace } from 'svelte-spa-router';

  // stores
  import { userStore } from './stores/user';

  // routes
  import { routes, routeNames } from './routes';

  // Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
  function conditionsFailed(event) {
      console.error('conditionsFailed event', event.detail);
      console.error('routeNames', routeNames);

      // based on the route that failed handle appropriately
      switch (event.detail.route) {
        default: {
          replace('/');
          break;
        }
      }

      return;
  }

  // Handles the "routeLoaded" event dispatched by the router when a component was loaded
  function routeLoaded(event) {
      console.log('routeLoaded event', event.detail)
  }

  onMount(async () => {
    if ($userStore.isPollingRefreshUserToken) {
      console.log('onMount Running stop polling refresh token before refresh token');
      userStore.stopPollingRefreshUserToken();
    }

    console.log('onMount Running refresh token');
    await userStore.refreshUserToken({ jwt: $userStore.jwt });
  });

  // start polling if we are
  // logged in/have jwt
  $: if ($userStore.isAuthenticated && !$userStore.isPollingRefreshUserToken && !$userStore.isRefreshingUserToken && !$userStore.refreshUserTokenError) {
    console.log('reactive $userStore.isAuthenticated && !$userStore.isPollingRefreshUserToken && !$userStore.isRefreshingUserToken running');
    userStore.startPollingRefreshUserToken({
      jwt: $userStore.jwt,
    });
  }

  $: if ($userStore.refreshUserTokenError) {
    console.log('reactive $userStore.refreshUserTokenError');
    userStore.stopPollingRefreshUserToken();
    replace('/');
  }

  onDestroy(() => {
    userStore.stopPollingRefreshUserToken();
  });
</script>

<MaterialApp>
  <Router {routes} on:conditionsFailed={conditionsFailed} on:routeLoaded={routeLoaded}/>
</MaterialApp>

<style>
  :global(.s-app-bar) {
      position: relative;
      z-index: 1;
  }
</style>
