<script lang="ts">
import { onDestroy } from 'svelte';

  // node_modules
  import { MaterialApp } from 'svelte-materialify/src'
  import Router, { replace } from 'svelte-spa-router';

  // routes
  import { routes, routeNames } from './routes';
import { userStore } from './stores/user';

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
      // // Perform any action, for example replacing the current route
      // if (event.detail.userData.foo == 'bar') {
      //     replace('/hello/world')
      // }
  }

  // Handles the "routeLoaded" event dispatched by the router when a component was loaded
  function routeLoaded(event) {
      console.log('routeLoaded event', event.detail)
  }


    // start polling if we are
    // logged in/have jwt
  $: if ($userStore.isAuthenticated && !$userStore.isPollingRefreshUserToken) {
    console.log('App.svelte - polling jwt');
    userStore.startPollingRefreshUserToken({
      jwt: $userStore.jwt,
    });
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
