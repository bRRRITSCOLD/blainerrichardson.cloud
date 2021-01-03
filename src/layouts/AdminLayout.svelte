<script>
  // node_modules
  import {
    NavigationDrawer,
    List,
    ListItem,
    Avatar,
    Divider,
    Icon,
  } from 'svelte-materialify/src';
import AdminNavBar from '../components/AdminNavBar.svelte';

  // componenets
  import NavBar from "../components/NavBar.svelte";

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

<AdminNavBar/>
<slot name="main" />