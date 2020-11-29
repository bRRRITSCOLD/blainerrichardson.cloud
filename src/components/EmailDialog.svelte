<script>
  import { Button, TextField, Textarea } from 'svelte-materialify/src';

  import Dialog from "./UI/Dialog.svelte";

  export let active = false;
</script>

<Dialog bind:active>
  <div slot="title">
    <div class="d-flex flex-row">
      <div>Email</div>
    </div>
  </div>
  <div slot="body">
    <div class="d-flex flex-column">
      <TextField style="padding-top: 10px;">Email Address</TextField>
      <TextField style="padding-top: 10px;">Subject</TextField>
      <Textarea style="padding-top: 10px;">Body</Textarea>
    </div>
  </div>
  <div slot="footer">
    <div class="d-flex flex-row">
      <Button>Send</Button>
      <Button>Cancel</Button>
    </div>
  </div>
</Dialog>