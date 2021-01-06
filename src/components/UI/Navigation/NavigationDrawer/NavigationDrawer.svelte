<!-- <script>
  // node_modules
  import { AppBar, Button, Icon, Menu, ListItem } from 'svelte-materialify/src';
  import { mdiDotsVertical } from '@mdi/js';
</script>

<Menu right>
  <div slot="activator">
    <Button fab depressed>
      <Icon path={mdiDotsVertical} />
    </Button>
  </div>
  {#if !$userStore.isAuthenticated}
    <ListItem style="padding: 0px;"><Button on:click={() => {
      // dispatch('onLoginButtonClick', true);
      uiStore.openLoginModal();
    }}>Login</Button></ListItem>
  {:else}
    <ListItem style="padding: 0px;"><Button on:click={() => {
      // cleasr and reset all user data
      userStore.reset();

      // navigate the user to the home page
      push('/');
    }}>Logout</Button></ListItem>
  {/if}
</Menu> -->
<script>
  // node_modules
  import {
    List,
    ListItem,
    Avatar,
    Divider,
    Icon,
    AppBar,
    Button,
    Overlay,
  } from 'svelte-materialify/src';
  import { createEventDispatcher  } from 'svelte';

  // components
  import NavBar from './NavBar.svelte';

  // file constants
  const dispatch = createEventDispatcher();

  function mouseenter() {
    mini = false;
  }
  function mouseleave() {
    mini = true;
  }

  export let active = false;
  export let mini = false;
  function onOverlayClick() {
    dispatch('onOverlayClick', true);
  }
</script>

<NavBar absolute {active}>Content</NavBar>
<Overlay {active} absolute on:click={onOverlayClick} index={1} />