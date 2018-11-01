<template>
  <div class="contain">
    <head-top></head-top>
    <visitor-pie :pieDatas="pieData"></visitor-pie>
  </div>
</template>

<script>
  import api from '@/js/api.js'
  import HeadTop from '@/components/HeadTop'
  import VisitorPie from '@/components/VisitorPie'
  export default {
    name: 'Explain',
    data () {
      return {
        pieData: {}
      }
    },
    components: {
      HeadTop,
      VisitorPie
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        api.getUserCity().then(res => {
          console.log(res)
          this.pieData = res.user_city
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
  background: whitesmoke;
}
</style>
