<script lang="ts">
  // node_modules
  import { fade } from 'svelte/transition';
  import { Icon } from 'svelte-materialify/src/';
  import { onMount } from 'svelte';
  import * as _ from 'lodash';
  
  // layouts
  import BaseLayout from '../layouts/BaseLayout.svelte';

  // components
  import Circle from '../components/UI/Misc/Circle/Circle.svelte';
  import EmailDialog from '../components/Email/EmailDialog/EmailDialog.svelte';
  import ResumeDialog from '../components/Resume/ResumeDialog/ResumeDialog.svelte';

  // stores
  import { uiStore } from '../stores/ui';
  import { emailStore } from '../stores/email';

  let iconLinks = $uiStore.iconLinks.map((iconLink) => _.assign(
    {},
    iconLink,
    { color: 'black' }
  ));

  onMount(() => {
    uiStore.startChangingCircleText('Hello');
  })
</script>

{#if $uiStore.isEmailDialogOpen}
  <EmailDialog
    bind:isEmailing={$emailStore.isSendingEmail}
    bind:active={$uiStore.isEmailDialogOpen}
    on:onCancelButtonClick={() => {
      uiStore.closeEmailDialog()
    }}
    on:onSendButtonClick={async (event) => {
      // create request to api
      const sendEmailRequest = { email: {
        from: {
          address: 'blainerrichardson@gmail.com'
        },
        to: [{
          address: event.detail.emailAddress
        }],
        subject: event.detail.subject,
        text: event.detail.body,
      } };
      
      // call store thunk and send email
      await emailStore.sendEmail(sendEmailRequest);

      // indicate that the dialog
      // is not to be open now
      uiStore.closeEmailDialog();
    }}
  />
{/if}

{#if $uiStore.isResumeDialogOpen}
  <ResumeDialog
    bind:active={$uiStore.isResumeDialogOpen}
    on:onCloseIconClick={() => {
      uiStore.closeResumeDialog()
    }}
  />
{/if}

<BaseLayout>
  <div slot="body">
    <div style="height: 100%; padding-top: 100px;" class="d-flex flex-column align-center justify-center">
      <div class="d-flex flex-row justify-center">
        <Circle color="black" width="250px" height="250px">
          {#if $uiStore.circleText}
            <div style="color: #FF6600;" class="text-h3" transition:fade|local><strong>{_.capitalize($uiStore.circleText)}</strong></div>
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
              uiStore.stopChangingCircleText();
              uiStore.setCircleText('');
              uiStore.startChangingCircleText(link.name);
            }}
            on:mouseleave={() => {
              link.color = 'black';
              uiStore.stopChangingCircleText();
              uiStore.setCircleText('');
              uiStore.startChangingCircleText('Hello');
            }}
            on:click={() => {
              if (link.name.toLowerCase() === 'email') {
                uiStore.openEmailDialog()
              } else  if (link.name.toLowerCase() === 'resume') {
                uiStore.openResumeDialog()
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
  </div>
</BaseLayout>

<style>
</style>
