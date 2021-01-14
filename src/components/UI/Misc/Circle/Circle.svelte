<script lang="ts">
  export let color: string = 'black'
  export let width: string = '100px';
  export let height: string = '100px';
</script>

<div style="background: {color}; width: {width}; height: {height};" class="circle">
  <slot />
</div>

<style src="./Circle.scss">
</style>