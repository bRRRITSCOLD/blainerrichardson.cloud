<script>
  // node_modules
  import { AppBar } from 'svelte-materialify/src';
</script>

<AppBar flat style="width: 100%; background-color: white;">
  <slot />
</AppBar>

<style lang="scss" src="./NavigationBar.scss" >
</style>


<!-- <div style="flex-grow:1" />
<Menu right>
  <div slot="activator">
    <Button fab depressed>
      <Icon path={mdiDotsVertical} />
    </Button>
  </div>
  {#if !$userStore.isAuthenticated}
    <ListItem style="padding: 0px;"><Button on:click={() => {
      // dispatch('onLoginButtonClick', true);
      uiStore.openLoginDialog();
    }}>Login</Button></ListItem>
  {:else}
    <ListItem style="padding: 0px;"><Button on:click={() => {
      // cleasr and reset all user data
      userStore.reset();

      // navigate the user to the home page
      push('/home');
    }}>Logout</Button></ListItem>
  {/if}
</Menu> -->