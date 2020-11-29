<script>
  import Dialog from "./UI/Dialog.svelte";

  export let active = false;
</script>

<Dialog bind:active fullscreen>
  <div slot="body">
    Resume
  </div>
</Dialog>