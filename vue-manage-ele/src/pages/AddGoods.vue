<template>
  <div class="contain">
    <head-top></head-top>
    <el-row style="margin: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">选择食品种类</header>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
export default {
  name: 'AddGoods',
  data () {
    return {

    }
  },
  components: {
    HeadTop
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>
.contain{
  width: 100%;
  height:100%;
}
.form_header{
  text-align: center;
  margin-bottom: 10px;
}
</style>
