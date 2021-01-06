<script>
  import { Button } from 'svelte-materialify/src';

  export let data;
  export let dataName;

  let background = 'white'
</script>
<!-- 
<Button
  depressed
  style="width: 100%; padding-bottom: 10px; font-size: 10px; height: 100%;"
> -->
<div
  class="text-align-center"
  style="height: 100%; width: 100%; background: {background}; cursor: pointer;"
  on:mouseover={() => { background = 'lightgray' }}
  on:mouseleave={() => { background = 'white' }}
>
  {data && data[dataName] ? data[dataName] : ''}
</div>

<style lang="scss" src="./WorkExperienceAdminTableRowDefaultCell.scss" >
</style>