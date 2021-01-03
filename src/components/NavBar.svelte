<script>
  // node_modules
  import { AppBar, Button, Icon, Menu, ListItem } from 'svelte-materialify/src';
  import { mdiDotsVertical } from '@mdi/js';
  import { createEventDispatcher  } from 'svelte';

  // components
  import LoginModal from './LoginModal.svelte';

  // props
  export let loginModalActive = false;
  export let isLoggingIn = false;
  let klass = '';
  export { klass as class };
  // component constants
  const dispatch = createEventDispatcher();
</script>

<AppBar class="{klass}" flat style="width: 100%; background-color: white;">
  <div style="flex-grow:1" />
  <!-- <Menu style="padding: 0px;" right> -->
  <Menu right>
    <div slot="activator">
      <Button fab depressed>
        <Icon path={mdiDotsVertical} />
      </Button>
    </div>
    <ListItem style="padding: 0px;"><Button on:click={() => {
      dispatch('onLoginButtonClick', true);
    }}>Login</Button></ListItem>
  </Menu>
</AppBar>

{#if loginModalActive}
  <LoginModal
    bind:active={loginModalActive}
    bind:isLoggingIn={isLoggingIn}
    on:onLoginButtonClick={(event) => {
      dispatch('onLoginModalLoginButtonClick', event.detail);
    }}
    on:onCancelButtonClick={() => {
      dispatch('onLoginModalCancelButtonClick', true);
    }}
  />
{/if}