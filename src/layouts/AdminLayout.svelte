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
  import { push } from 'svelte-spa-router';
  import { mdiDotsVertical } from '@mdi/js';

  // componenets
  import NavigationBar from '../components/UI/Navigation/NavigationBar/NavigationBar.svelte';
  import NavigationMenu from '../components/UI/Navigation/NavigationMenu/NavigationMenu.svelte';
  import NavigationDrawer from '../components/UI/Navigation/NavigationDrawer/NavigationDrawer.svelte';

  // stores
  import { uiStore } from "../stores/ui";
  import { userStore } from "../stores/user";


  let mini = true;
  function mouseenter() {
    mini = false;
  }
  function mouseleave() {
    mini = true;
  }

  let active = false;
  function toggleNavigation() {
    active = !active;
  }
</script>

<NavigationBar>
  <div>
    <Button fab depressed on:click={() => {
      uiStore.openAdminNavigationDrawer();
    }}>
      <Icon class="mdi mdi-menu" />
    </Button>
  </div>
  <div style="flex-grow:1" />
  <NavigationMenu>
    <div slot="activator">
      <Button fab depressed>
        <Icon path={mdiDotsVertical} />
      </Button>
    </div>
    <ListItem style="padding: 0px;"><Button on:click={() => {
      // cleasr and reset all user data
      userStore.reset();

      // navigate the user to the home page
      push('/');
    }}>Logout</Button></ListItem>
  </NavigationMenu>
</NavigationBar>
<NavigationDrawer
  bind:active={$uiStore.isAdminNavigationDrawerOpen}
  on:onOverlayClick={() => {
    uiStore.closeAdminNavigationDrawer();
  }}
/>

<slot name="body" />