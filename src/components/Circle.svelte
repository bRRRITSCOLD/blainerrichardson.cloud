<script lang="ts">
  export let color: string = 'black'
  export let width: string = '100px';
  export let height: string = '100px';
</script>

<div style="background: {color}; width: {width}; height: {height};" class="circle">
  <slot />
</div>

<style>
  .circle {
    border-radius: 50%;
    display: flex; /* or inline-flex */
    align-items: center; 
    justify-content: center;
  }
</style>