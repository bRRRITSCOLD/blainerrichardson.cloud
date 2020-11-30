<script>
  import {
    Dialog,
    Card,
    CardTitle,
    CardText,
    CardActions,
  } from 'svelte-materialify/src';

  export let active = false;
  export let fullscreen = false;
</script>

<Dialog bind:fullscreen bind:active>
  <Card>
    <slot />
  </Card>
</Dialog>