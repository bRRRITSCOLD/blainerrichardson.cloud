<script>
  // node_modules
  import { Menu } from 'svelte-materialify/src';

  export let right = true;
</script>

<Menu right={right}>
  <div slot="activator">
    <slot name="activator" />
  </div>
  <slot />
</Menu>

<style lang="scss" src="./NavigationMenu.scss" >
</style>

<!-- <div slot="activator">
  <slot name="activator" />
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
{/if} -->