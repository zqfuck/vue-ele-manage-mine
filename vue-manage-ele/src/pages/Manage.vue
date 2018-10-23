<template>
  <div class="manage_page fillContain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <side-bar></side-bar>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  name: 'Manage',
  components: {
    SideBar
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.fillContain{
  width: 100%;
  height: 100%;
}
</style>
