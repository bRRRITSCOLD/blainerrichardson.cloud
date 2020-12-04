<script lang="ts">
  // node_modules
  import { Button, Dialog, Card, CardTitle, CardText, CardActions, Icon, Chip } from 'svelte-materialify/src';
  import { mdiClose } from '@mdi/js';
  import { createEventDispatcher  } from 'svelte';
  import MultiSidedTimeline from './MultiSidedTimeline.svelte';
  import { appStore } from '../stores/app';
  import moment from 'moment';

  // components

  // props
  export let active = false;

  // file constants
  const dispatch = createEventDispatcher();

  let closeIconColor = 'white';
</script>

<Dialog bind:active fullscreen>
  <div id="header" class="title-bar" style="position:absolute; top:0px; left:0px; height:50px; right:0px;overflow:hidden;"> 
    <div class="d-flex flex-row justify-space-between" style="width: 100%;">
      <div>Resume</div>
      <span
        on:mouseenter={() => {
          closeIconColor = 'gray';
        }}
        on:mouseleave={() => {
          closeIconColor = 'white';
        }}
        on:click={() => {
          dispatch('onCloseIconClick', true);
        }}
      >
        <Icon style="color: {closeIconColor};" size="30px" path={mdiClose} />
      </span>
    </div>
  </div>
  <div id="content" style="position:absolute; top:50px; bottom:50px; left:0px; right:0px; overflow:auto;"> 
    {#if $appStore.workExperience.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">Work Experience</div>
      <div style="padding-top: 20px;">
        <MultiSidedTimeline items={$appStore.workExperience} let:item>
          <!-- Header -->
          <div class="d-flex flex-column">
            <div style="font-size: 15px;">
              <strong>{item.position}</strong>
            </div>
            <div style="font-size: 15px;">
              {item.companyName}
            </div>
            <div style="font-size: 15px;">
              {moment(item.startDate).format('MMM YYYY')} to {moment(item.endDate).format('MMM YYYY')}
            </div>
            <div style="font-size: 15px;">
              {item.companyAddress.city}, {item.companyAddress.state}
            </div>
          </div>

          <!-- Footer/Actions -->
          <div class="d-flex flex-column">
            <ul>
              {#each item.duties as duty}
                <li style="font-size: 13px;">{duty}</li>
              {/each}
            </ul>
            <ul>
              {#each item.accomplishments as accomplishment}
                <li style="font-size: 13px;">{accomplishment}</li>
              {/each}
            </ul>
          </div>
        </MultiSidedTimeline>
      </div>
    {/if}
    {#if $appStore.schoolExperience.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">School Experience</div>
      <div style="padding-top: 20px;">
        <MultiSidedTimeline items={$appStore.schoolExperience} let:item>
          <!-- Header -->
          <div class="d-flex flex-column">
            <div style="font-size: 15px;">
              <strong>{item.degree}</strong>
            </div>
            <div style="font-size: 15px;">
              {item.schoolName}
            </div>
            <div style="font-size: 15px;">
              {moment(item.startDate).format('MMM YYYY')} to {moment(item.endDate).format('MMM YYYY')}
            </div>
            <div style="font-size: 15px;">
              {item.schoolAddress.city}, {item.schoolAddress.state}
            </div>
          </div>

          <!-- Body -->
          <div class="d-flex flex-column">
            <ul>
              {#each item.classes as klass}
                <li style="font-size: 13px;">{klass}</li>
              {/each}
            </ul>
          </div>
        </MultiSidedTimeline>
      </div>
    {/if}
    {#if $appStore.certifications.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">Certifications</div>
      <div style="padding-top: 20px;">
        <MultiSidedTimeline items={$appStore.certifications} let:item>
          <!-- Header -->
          <div class="d-flex flex-column">
            <div style="font-size: 15px;">
              <strong>{item.name}</strong>
            </div>
            <div style="font-size: 15px;">
              {item.institution}
            </div>
            <div style="font-size: 15px;">
              {moment(item.startDate).format('MMM YYYY')} to {moment(item.endDate).format('MMM YYYY')}
            </div>
          </div>
        </MultiSidedTimeline>
      </div>
    {/if}
    {#if $appStore.skills.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">Skills</div>
      <div class="d-flex flex-row flex-wrap justify-space-between" style="width: 100%;">
        {#each $appStore.skills as skill}
          <div style="padding: 10px;">
            {skill}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div id="footer" class="actions-bar" style="position:absolute; bottom:0px; height: 50px; left:0px; right:0px; overflow:hidden;">
    <div class="d-flex flex-row justify-end">
      <Button class="primary-color">
        Download
      </Button>
    </div>
  </div>
</Dialog>

<style lang="scss">
.title-bar {
  background-color: black;
  color: #FF6600;
}

.actions-bar {
  background-color: black;
  color: #FF6600;
}
</style>