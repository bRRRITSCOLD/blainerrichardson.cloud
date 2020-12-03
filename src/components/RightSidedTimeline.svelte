<script lang="ts">
  // node_modules
  import { Card } from 'svelte-materialify/src';

  // props
  export let items: any[] = [];
</script>

<div class="timeline" >
  {#each items as item, i}
    <div class="container right">
      <Card>
        <slot item={item}>Missing template</slot>
      </Card>
    </div>
  {/each}
</div>

<style>

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: black;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.container::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -13px;
  background-color: white;
  border: 4px solid #FF6600;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the right */
.right {
  left: 50%;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid black;
  border-width: 10px 10px 10px 0;
  border-color: transparent black transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -13px;
}
</style>