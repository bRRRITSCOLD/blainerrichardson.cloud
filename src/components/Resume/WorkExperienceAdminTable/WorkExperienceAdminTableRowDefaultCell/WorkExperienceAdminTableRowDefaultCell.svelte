<script>
  import { Icon, Tooltip } from 'svelte-materialify/src';
  import { mdiInformation } from '@mdi/js';

  export let width;
  export let data;
  export let dataName;

  let background = 'white'
  let show = false

  let spanElement;</script>
<!-- 
<Button
  depressed
  style="width: 100%; padding-bottom: 10px; font-size: 10px; height: 100%;"
> -->
<div
  class="text-align-center"
  style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0px; height: 100%; width: 100%; background: {background}; cursor: pointer;"
  on:mouseover={() => {
    background = 'lightgray'
    if (spanElement.offsetWidth > width) show = true;
  }}
  on:mouseleave={() => {
    background = 'white'
    if (show) show = false;
  }}
>
  {#if spanElement && spanElement.offsetWidth > width}
    <Icon path={mdiInformation} />
  {/if}
  <span bind:this={spanElement}>
    {data && data[dataName] ? data[dataName] : ''}
  </span>
</div>

<style lang="scss" src="./WorkExperienceAdminTableRowDefaultCell.scss" >
</style>

<!-- <Tooltip top bind:active={show}>
  <Icon class="mdi mdi-cart" />
  <span slot="tip">Programmatic tooltip</span>
</Tooltip> -->