<script lang="ts">
  // node_modules
  import { onDestroy, onMount } from 'svelte';
  import { MaterialApp } from 'svelte-materialify/src'
  import Router, { replace, location } from 'svelte-spa-router';

  // stores
  import { userStore } from './stores/user';

  // routes
  import { routes, routeNames } from './routes';

  // Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
  function conditionsFailed(event) {
      // console.error('conditionsFailed event', event.detail);
      // console.error('routeNames', routeNames);

      if ($location !== '/') {
        // based on the route that failed handle appropriately
        switch (event.detail.route) {
          default: {
              replace('/');
            break;
          }
        }
      }

      return;
  }

  // Handles the "routeLoaded" event dispatched by the router when a component was loaded
  function routeLoaded(_event) {
      // console.log('routeLoaded event', event.detail)
  }

  onMount(async () => {
    if ($userStore.isPollingRefreshUserToken) {
      userStore.stopPollingRefreshUserToken();
    }

    await userStore.refreshUserToken({ jwt: $userStore.jwt });
  });

  // start polling if we are
  // logged in/have jwt
  $: if ($userStore.isAuthenticated && !$userStore.isPollingRefreshUserToken && !$userStore.isRefreshingUserToken && !$userStore.refreshUserTokenError) {
    userStore.startPollingRefreshUserToken({
      jwt: $userStore.jwt,
    });
  }

  $: if ($userStore.refreshUserTokenError) {
    userStore.stopPollingRefreshUserToken();
    if ($location !== '/') {
      replace('/');
    }
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
