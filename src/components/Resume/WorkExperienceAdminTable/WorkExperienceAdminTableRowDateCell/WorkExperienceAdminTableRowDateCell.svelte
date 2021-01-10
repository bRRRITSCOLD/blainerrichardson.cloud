<script>
  import {  format } from 'date-fns';
  
  
    export let data;
    export let dataName;
  
    let background = 'white'
  </script>
  
  <div
    class="text-align-center"
    style="height: 100%; width: 100%; background: {background}; cursor: pointer;"
    on:mouseover={() => { background = 'lightgray' }}
    on:mouseleave={() => { background = 'white' }}
  >
    {
      data && data[dataName]
        ? format(new Date(data[dataName]), `MMMM',' yyyy`)
        : ''
    }
  </div>
  
  <style lang="scss" src="./WorkExperienceAdminTableRowDateCell.scss" >
  </style>