<script lang="ts">
  import { MaterialApp } from 'svelte-materialify/src'
  import Router from 'svelte-spa-router';
import NavBar from './components/NavBar.svelte';

  import routes from './routes';

</script>

<MaterialApp>
  <NavBar/>
  <Router {routes}/>
</MaterialApp>

<style>
</style>
