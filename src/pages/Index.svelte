<script lang="ts">
  // node_modules
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-materialify/src/components/Icon';
  import { onMount } from 'svelte';
  import * as _ from 'lodash';
  
  // components
  import Circle from '../components/Circle.svelte';
  import EmailDialog from '../components/EmailDialog.svelte';

  // stores
  import { appStore } from '../stores/app';
import ResumeDialog from '../components/ResumeDialog.svelte';

  let iconLinks = $appStore.iconLinks.map((iconLink) => _.assign(
    {},
    iconLink,
    { color: 'black' }
  ));

  let emailDialogActive = false;
  let resumeDialogActive = false;

  onMount(() => {
    appStore.startChangingCircleText('Hello');
  })
</script>

{#if emailDialogActive}
  <EmailDialog
    bind:active={emailDialogActive}
    on:onCancelButtonClick={() => {
      emailDialogActive = false;
    }}
    on:onSendButtonClick={(event) => {
      console.log(event.detail);
      emailDialogActive = false;
    }}
  />
{/if}

{#if resumeDialogActive}
  <ResumeDialog
    bind:active={resumeDialogActive}
    on:onCloseIconClick={() => {
      resumeDialogActive = false;
    }}
  />
{/if}

<div style="height: 100vh;" class="d-flex flex-column align-center justify-center">
  <div class="d-flex flex-row justify-center">
    <Circle color="black" width="250px" height="250px">
      {#if $appStore.circleText}
        <div style="color: #FF6600;" class="text-h3" transition:fade><strong>{_.capitalize($appStore.circleText)}</strong></div>
      {/if}
    </Circle>
  </div>
  <div style="padding-top: 10px; color: black;" class="text-h5">I am <strong>Blaine Richardson</strong></div>
  <div style="color: black;" class="text-h8">Developer, creator, inventor</div>
  <div style="padding-top: 10px; width: 60%;" class="d-flex flex-row justify-center">
    {#each iconLinks as link}
      <span
        on:mouseenter={() => {
          link.color = 'gray';
          appStore.stopChangingCircleText();
          appStore.setCircleText('');
          appStore.startChangingCircleText(link.name);
        }}
        on:mouseleave={() => {
          link.color = 'black';
          appStore.stopChangingCircleText();
          appStore.setCircleText('');
          appStore.startChangingCircleText('Hello');
        }}
        on:click={() => {
          if (link.name.toLowerCase() === 'email') {
            emailDialogActive = true;
          } else  if (link.name.toLowerCase() === 'resume') {
            resumeDialogActive = true;
          } else if (link.href) {
            window.location.href = link.href;
          }
        }}
      >
        <Icon size="70px" style="color: {link.color};" path={link.path} />
      </span>
    {/each}
  </div>
</div>

<style>
</style>
