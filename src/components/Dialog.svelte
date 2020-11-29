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
      <slot name="title">
        <span >Unknown Title</span>
      </slot>
    </CardTitle>
    <CardText>
      <slot name="body">
        <span >Unknown Body</span>
      </slot>
    </CardText>
    <CardActions class="justify-end">
      <slot name="footer">
        <span >Unknown Footer</span>
      </slot>
    </CardActions>
  </Card>
</Dialog>