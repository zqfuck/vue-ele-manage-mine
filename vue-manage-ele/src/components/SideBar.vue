<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      @select="handleSelect"
      theme="dark"
      background-color="#545c64"
      text-color="#fff"
      router
      style="min-height: 100%;"
      >
      <el-menu-item index="/manage"><i class="el-icon-menu"></i>首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
        <el-menu-item index="/manage/userList">用户列表</el-menu-item>
        <el-menu-item index="/manage/orderList">订单列表</el-menu-item>
        <el-menu-item index="/manage/shopList">商家列表</el-menu-item>
        <el-menu-item index="foodList">食品列表</el-menu-item>
        <el-menu-item index="adminList">管理员列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
        <el-menu-item index="addShop">添加商铺</el-menu-item>
        <el-menu-item index="addGoods">添加商品</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-star-on"></i>图表</template>
        <el-menu-item index="visitor">用户分布</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-edit"></i>编辑</template>
        <el-menu-item index="vueEdit">文本编辑</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-setting"></i>设置</template>
        <el-menu-item index="adminSet">管理员设置</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-warning"></i>说明</template>
        <el-menu-item index="explain">说明</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default{
  name: 'SideBar',
  data () {
    return {

    }
  },
  computed: {
    defaultActive () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSelect () {
    }
  }
}
</script>

<style scoped>

</style>
