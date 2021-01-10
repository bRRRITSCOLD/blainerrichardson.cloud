<script>
  import { onMount } from 'svelte';

  import { Button, Tooltip } from 'svelte-materialify/src';

  export let width;
  export let data;
  export let dataName;

  let background = 'white'
  let show = false

  let divElement;
  let spanElement;

  function isEllipsisActive(e) {
     return (e.offsetWidth < e.scrollWidth);
  }

  function onMouseOver() {
    background = 'lightgray' ;
  }

  function onMouseLeave() {
    background = 'white';
  }

  onMount(() => {
    // TODO: if line 23 is larger than 22 then ellipsis is true and tooltip should come up on hover - do this in the htl tags as width is 0 here
    // console.log(`${dataName} width`, width);
    console.log(`${dataName} spanElement.offsetWidth`, spanElement.offsetWidth);
  });
</script>
<!-- 
<Button
  depressed
  style="width: 100%; padding-bottom: 10px; font-size: 10px; height: 100%;"
> -->
<div
  class="text-align-center"
  style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0px; height: 100%; width: 100%; background: {background}; cursor: pointer;"
  bind:this={divElement}
  on:mouseover={() => {
    background = 'lightgray'
    show = true;
  }}
  on:mouseleave={() => {
    background = 'white'
    show = false;
  }}
>
  <span bind:this={spanElement}>
    {data && data[dataName] ? data[dataName] : ''}
  </span>
</div>

<Tooltip top bind:active={show}>
  <!-- <Icon class="mdi mdi-cart" /> -->
  <span slot="tip">Programmatic tooltip</span>
</Tooltip>

<style lang="scss" src="./WorkExperienceAdminTableRowDefaultCell.scss" >
</style>

<!-- <Tooltip top bind:active={show}>
  <Icon class="mdi mdi-cart" />
  <span slot="tip">Programmatic tooltip</span>
</Tooltip> -->