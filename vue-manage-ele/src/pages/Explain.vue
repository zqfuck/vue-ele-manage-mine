<template>
  <div class="contain">
    <head-top></head-top>
    <h3>ele-后台数据管理系统</h3>
    <p>第一次登录的用户自动注册成为普通管理员</p>
    <p>普通管理员可以增加信息</p>
    <p>超级管理员可以删除信息</p>
  </div>
</template>

<script>
  import HeadTop from '@/components/HeadTop'
  export default {
    name: 'Explain',
    data () {
      return {

      }
    },
    components: {
      HeadTop
    }
  }
</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
  background: whitesmoke;
}
h3{
  font-size: 25px;
  line-height: 40px;
  text-align: center;
  padding-top: 30px;
}
p{
  text-align: center;
  font-size: 22px;
  color: #666;
  margin: 15px;
}
</style>
