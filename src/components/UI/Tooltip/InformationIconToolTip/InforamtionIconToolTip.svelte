<script lang="ts">
  // node_modules
  import { Icon, Tooltip } from 'svelte-materialify/src';
  import { mdiInformation } from '@mdi/js';

</script>

<Tooltip bottom>
  <Icon path={mdiInformation} />
  <span slot="tip">
    <slot />
  </span>
</Tooltip>