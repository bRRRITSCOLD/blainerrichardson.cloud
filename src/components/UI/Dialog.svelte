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
    <CardTitle>
      <slot name="title" />
    </CardTitle>
    <CardText>
      <slot name="body" />
    </CardText>
    <CardActions class="justify-end">
      <slot name="footer" />
    </CardActions>
  </Card>
</Dialog>