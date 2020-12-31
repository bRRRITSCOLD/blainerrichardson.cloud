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
  <Router {routes}/>
</MaterialApp>

<style>
</style>
