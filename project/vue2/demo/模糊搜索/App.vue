<template>
  <div>
    <MySearch :lists="lists"/>
  </div>
</template>

<script>

import MySearch from '@/components/MySearch.vue'
import {nanoid} from 'nanoid'

export default {
  name      : 'App',
  components: {MySearch},
  data () {
    return {
      lists: [
        {id: nanoid(), name: '马冬梅', age: 19},
        {id: nanoid(), name: '周冬雨', age: 16},
        {id: nanoid(), name: '周杰伦', age: 18},
        {id: nanoid(), name: '温兆伦', age: 17},
      ],
    }
  },
}
</script>

<style>

</style>
