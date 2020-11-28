<script lang="ts">
  // node_modules
	import { fade } from 'svelte/transition';
  import { MaterialApp, Button } from 'svelte-materialify/src'
  import Circle from './components/Circle.svelte';
  import Icon from 'svelte-materialify/src/components/Icon';
  import { mdiLinkedin, mdiGithub, mdiEmail } from '@mdi/js';
  import { onMount } from 'svelte';
  import * as _ from 'lodash';
  import { appStore } from './stores/app';

  let circleText = '';
  $: circleText = $appStore.circleText;

  let iconLinks = [
    {
      name: 'linkedin',
      path: mdiLinkedin,
      color: 'black'
    },
    {
      name: 'github',
      path: mdiGithub,
      color: 'black'
    },
    {
      name: 'email',
      path: mdiEmail,
      color: 'black'
    }
  ];

  onMount(() => {
    appStore.startChangingCircleText('Hello');
  })
</script>

<MaterialApp>
  <div style="height: 100vh;" class="d-flex flex-column align-center justify-center">
    <div class="d-flex flex-row justify-center">
      <Circle color="black" width="250px" height="250px">
        {#if circleText}
          <div style="color: yellow;" class="text-h3" transition:fade><strong>{_.capitalize(circleText)}</strong></div>
        {/if}
      </Circle>
    </div>
    <div style="padding-top: 10px; color: black;" class="text-h5">Blaine <strong>Richardson</strong></div>
    <div style="color: black;" class="text-h8">Developer, creator, inventor</div>
    <div style="padding-top: 10px; width: 60%;" class="d-flex flex-row justify-space-around">
      {#each iconLinks as link}
        <span
          on:mouseenter={() => {
            link.color = 'gray';
            appStore.stopChangingCircleText();
            appStore.setCircleText('');
            appStore.startChangingCircleText(link.name);
            // circleText = '';
            // setTimeout(() => {
            //   circleText = link.name;
            // }, 300)
          }}
          on:mouseleave={() => {
            link.color = 'black';
            appStore.stopChangingCircleText();
            appStore.setCircleText('');
            appStore.startChangingCircleText('Hello');
            // circleText = '';
          }}
        >
          <Icon size="65px" style="color: {link.color};" path={link.path} />
        </span>
      {/each}
    </div>
  </div>
</MaterialApp>

<style>
</style>
