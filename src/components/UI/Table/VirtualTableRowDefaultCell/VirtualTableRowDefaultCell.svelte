<script lan="ts">
  let background = 'white'
</script>

<div
  class="text-align-center"
  style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0px; height: 100%; width: 100%; background: {background}; cursor: pointer;"
  on:mouseover={() => {
    background = 'lightgray';
  }}
  on:mouseleave={() => {
    background = 'white';
  }}
>
  <slot />
</div>