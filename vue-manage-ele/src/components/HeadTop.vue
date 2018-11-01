<template>
  <div class="head_contain">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item  v-for="(item, index) in this.$route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img src="../assets/head_pic.jpg" alt="" class="head_pic">
      <el-dropdown-menu slot="dropdown" style="margin-right: 30px;width: 80px;text-align: center;">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import api from '@/js/api.js'
import { mapActions, mapState } from 'vuex'
export default{
  name: 'HeadTop',
  data () {
    return {

    }
  },
  created () {
    if (!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['getAdminData']),
    handleCommand (command) {
      if (command === 'home') {
        this.$router.push('/manage')
      } else if (command === 'logout') {
        this.$message({
          message: '退出成功了',
          duration: 1000
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.head_contain{
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #EFF2F7;
  justify-content: space-between;
  padding-left: 25px;
  align-items: center;
}
.head_pic{
  width: 40px;
  border-radius: 50%;
  margin-right: 80px;
  cursor: pointer;
}
</style>
