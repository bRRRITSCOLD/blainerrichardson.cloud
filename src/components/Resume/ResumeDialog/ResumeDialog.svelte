<script lang="ts">
  // node_modules
  import { Button, Dialog, Icon } from 'svelte-materialify/src';
  import { mdiClose } from '@mdi/js';
  import { createEventDispatcher, onMount  } from 'svelte';
  import moment from 'moment';

  // components
  import MultiSidedTimeline from '../../UI/Timeline/MultiSidedTimeline/MultiSidedTimeline.svelte';

  // stores
  import { resumeStore } from '../../../stores/resume';

  // props
  export let active = false;

  // file constants
  const dispatch = createEventDispatcher();

  let closeIconColor = 'white';

  onMount(() => {
    console.log('workExperience', JSON.stringify($resumeStore.workExperiences));
    console.log('schoolExperience', JSON.stringify($resumeStore.schoolExperiences));
    console.log('certifications', JSON.stringify($resumeStore.certifications));
  });
</script>

<Dialog bind:active fullscreen>
  <div id="header" class="title-bar" style="position:absolute; top:0px; left:0px; right:0px; overflow:hidden;"> 
    <div class="d-flex flex-row justify-space-between" style="padding: 10px; width: 100%;">
      <div>Resume</div>
      <span
        on:mouseenter={() => {
          closeIconColor = 'lightgray';
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
    {#if $resumeStore.workExperiences.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">Work Experience</div>
      <div style="padding-top: 20px;">
        <MultiSidedTimeline items={$resumeStore.workExperiences} let:item>
          <!-- Card -->
          <div style="padding: 10px;">
            <!-- Header -->
            <div class="d-flex flex-column">
              <div style="font-size: 16px;">
                <strong>{item.position}</strong>
              </div>
              <div style="font-size: 14px;">
                {item.companyName}
              </div>
              <div style="font-size: 12px;">
                {moment(item.startDate).format('MMM YYYY')} to {moment(item.endDate).format('MMM YYYY')}
              </div>
              <div class="secondary-text" style="font-size: 12px;">
                {item.companyAddress.city}, {item.companyAddress.state}
              </div>
            </div>
  
            <!-- Footer/Actions -->
            <div class="d-flex flex-column">
              <ul>
                {#each item.duties as duty}
                  <li style="font-size: 14px;">{duty}</li>
                {/each}
              </ul>
              <ul>
                {#each item.accomplishments as accomplishment}
                  <li style="font-size: 14px;">{accomplishment}</li>
                {/each}
              </ul>
            </div>
          </div>
        </MultiSidedTimeline>
      </div>
    {/if}
    {#if $resumeStore.schoolExperiences.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">School Experience</div>
      <div style="padding-top: 20px;">
        <MultiSidedTimeline items={$resumeStore.schoolExperiences} let:item>
          <!-- Card -->
          <div style="padding: 10px;">
            <!-- Header -->
            <div class="d-flex flex-column">
              <div style="font-size: 16px;">
                <strong>{item.degree}</strong>
              </div>
              <div style="font-size: 14px;">
                {item.schoolName}
              </div>
              <div style="font-size: 12px;">
                {moment(item.startDate).format('MMM YYYY')} to {moment(item.endDate).format('MMM YYYY')}
              </div>
              <div style="font-size: 12px;">
                {item.schoolAddress.city}, {item.schoolAddress.state}
              </div>
            </div>
  
            <!-- Body -->
            <div class="d-flex flex-column">
              <ul>
                {#each item.classes as klass}
                  <li style="font-size: 14px;">{klass}</li>
                {/each}
              </ul>
            </div>
          </div>
        </MultiSidedTimeline>
      </div>
    {/if}
    {#if $resumeStore.certifications.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">Certifications</div>
      <div style="padding-top: 20px;">
        <MultiSidedTimeline items={$resumeStore.certifications} let:item>
          <!-- Card -->
          <div style="padding: 10px;">
            <!-- Header -->
            <div class="d-flex flex-column">
              <div style="font-size: 16px;">
                <strong>{item.name}</strong>
              </div>
              <div style="font-size: 14px;">
                {item.institution}
              </div>
              <div style="font-size: 12px;">
                {moment(item.startDate).format('MMM YYYY')} to {moment(item.endDate).format('MMM YYYY')}
              </div>
            </div>
          </div>
        </MultiSidedTimeline>
      </div>
    {/if}
    {#if $resumeStore.skills.length}
      <div class="text-h4" style="padding-top: 20px; text-align: center;">Skills</div>
      <div class="d-flex flex-row flex-wrap justify-space-between" style="width: 100%;">
        {#each $resumeStore.skills as skill}
          <div style="padding: 10px;">
            {skill}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div id="footer" class="actions-bar" style="position:absolute; bottom:0px; left:0px; right:0px; overflow:hidden;">
    <div class="d-flex flex-row justify-end" style="padding: 10px; width: 100%;">
      <Button class="primary-color">
        Download
      </Button>
    </div>
  </div>
</Dialog>

<style src="./ResumeDialog.scss">
</style>