<script lang="ts">
  // node_modules
  import { Dialog, Card, CardTitle, CardText, CardActions, Icon } from 'svelte-materialify/src';
  import { mdiClose } from '@mdi/js';
  import { createEventDispatcher  } from 'svelte';

  // components

  // props
  export let active = false;

  // file constants
  const dispatch = createEventDispatcher();

  let closeIconColor = 'black';
</script>

<Dialog bind:active fullscreen>
  <Card>
    <CardTitle>
      <div class="d-flex flex-row justify-space-between" style="width: 100%;">
        <div>Resume Dialog Header</div>
        <span
          on:mouseenter={() => {
            closeIconColor = 'gray';
          }}
          on:mouseleave={() => {
            closeIconColor = 'black';
          }}
          on:click={() => {
            dispatch('onCloseIconClick', true);
          }}
        >
          <Icon style="color: {closeIconColor};" size="30px" path={mdiClose} />
        </span>
      </div>
    </CardTitle>
    <CardText>
      <div class="d-flex flex-column">
        <div class="d-flex flex-column">
          Resume Dialog Body
        </div>
      </div>
    </CardText>
    <CardActions class="justify-end">
      <div class="d-flex flex-row" style="padding-top: 10px;">
        Resume Dialog Footer
      </div>
    </CardActions>
  </Card>
</Dialog>

<style lang="scss">
.close-icon {
  color: black;
}

.close-icon:hover {
    color: gray;
  }
</style>