<script lang="ts">
  // node_modules
  import { MaterialApp } from 'svelte-materialify/src'
  import Router from 'svelte-spa-router';

  // routes
  import routes from './routes';

</script>

<MaterialApp>
  <Router {routes}/>
</MaterialApp>

<style>
</style>
