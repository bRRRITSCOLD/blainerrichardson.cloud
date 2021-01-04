<script>
  // node_modules
  import {
    NavigationDrawer,
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

<!-- <NavBar
  loginModalActive={$uiStore.isLoginModalOpen}
  on:onLoginButtonClick={() => {
    uiStore.openLoginModal();
  }}
  on:onLoginModalLoginButtonClick={async (event) => {
    // create request to api
    const authenticateUserRequest = {
      username: event.detail.username,
      password: event.detail.password
    };
    
    // call store thunk and send email
    await userStore.authenticateUser(authenticateUserRequest);

    // indicate that the dialog
    // is not to be open now
    uiStore.closeLoginModal();

    // reroute user to dashboard
    // TODO: reroute to dashboard/admin (build Dashboard/Admin page)
  }}
  on:onLoginModalCancelButtonClick={() => {
    uiStore.closeLoginModal();
  }}
  isLoggingIn={$userStore.isAuthenticatingUser}
/> -->

<!-- <AppBar flat style="width: 100%; background-color: white;">
  <div slot="icon">
    <Button fab depressed on:click={toggleNavigation}>
      <Icon class="mdi mdi-menu" />
    </Button>
  </div>
  <span slot="title"> Click The Menu </span>
</AppBar>
<NavDrawer absolute {active}>Content</NavDrawer>
<Overlay {active} absolute on:click={toggleNavigation} index={1} /> -->

<NavigationBar>
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

<slot name="body" />