<script lang="ts">
  // node_modules
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-materialify/src/components/Icon';
  import { onMount } from 'svelte';
  import * as _ from 'lodash';
  
  // layouts
  import BaseLayout from '../layouts/BaseLayout.svelte';

  // components
  import Circle from '../components/Circle.svelte';
  import EmailDialog from '../components/EmailDialog.svelte';
  import ResumeDialog from '../components/ResumeDialog.svelte';

  // stores
  import { appStore } from '../stores/app';
  import { uiStore } from '../stores/ui';

  let iconLinks = $appStore.iconLinks.map((iconLink) => _.assign(
    {},
    iconLink,
    { color: 'black' }
  ));

  onMount(() => {
    appStore.startChangingCircleText('Hello');
  })
</script>

{#if $uiStore.isEmailModalOpen}
  <EmailDialog
    isEmailing={$appStore.isSendingEmail}
    bind:active={$uiStore.isEmailModalOpen}
    on:onCancelButtonClick={() => {
      uiStore.closeEmailModal()
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
      await appStore.sendEmail(sendEmailRequest);

      // indicate that the dialog
      // is not to be open now
      uiStore.closeEmailModal();
    }}
  />
{/if}

{#if $uiStore.isResumeModalOpen}
  <ResumeDialog
    bind:active={$uiStore.isResumeModalOpen}
    on:onCloseIconClick={() => {
      uiStore.closeResumeModal()
    }}
  />
{/if}

<BaseLayout>
  <div slot="body">
    <div style="height: 100%; padding-top: 100px;" class="d-flex flex-column align-center justify-center">
      <div class="d-flex flex-row justify-center">
        <Circle color="black" width="250px" height="250px">
          {#if $appStore.circleText}
            <div style="color: #FF6600;" class="text-h3" transition:fade|local><strong>{_.capitalize($appStore.circleText)}</strong></div>
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
                uiStore.openEmailModal()
              } else  if (link.name.toLowerCase() === 'resume') {
                uiStore.openResumeModal()
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
