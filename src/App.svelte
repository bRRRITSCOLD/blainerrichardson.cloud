<script lang="ts">
  import { MaterialApp } from 'svelte-materialify/src'
  import Router from 'svelte-spa-router';

  import routes from './routes';

</script>

<MaterialApp>
  <Router {routes}/>
</MaterialApp>

<style>
</style>
