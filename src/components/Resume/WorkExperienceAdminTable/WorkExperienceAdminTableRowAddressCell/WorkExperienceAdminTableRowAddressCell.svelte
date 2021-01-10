<script>
import { addressUtils } from "../../../../lib/utils";


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
      ? addressUtils.format({
          addressLine1: data[dataName].addressLine1,
          addressLine2: data[dataName].addressLine2,
          city: data[dataName].city,
          state: data[dataName].state,
          zipCode: data[dataName].zipCode
        })
      : ''
  }
</div>

<style lang="scss" src="./WorkExperienceAdminTableRowAddressCell.scss" >
</style>