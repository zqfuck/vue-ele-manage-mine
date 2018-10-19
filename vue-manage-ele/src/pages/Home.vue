<template>
  <div class="">
    <head-top></head-top>
    <section>
      <h2 class="home_title">数据统计</h2>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="4"><div class="data_list"><span class="data_head">当日数据 :</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num"></span>新增用户</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num"></span>新增订单</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num"></span>新增管理员</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="4"><div class="data_list"><span class="data_head">总数据 :</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num"></span>注册用户</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num"></span>订单</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num"></span>管理员</div></el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
export default{
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    HeadTop
  },
  methods: {

  }
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
section{
  padding: 20px;
  margin-bottom: 30px;
}
.home_title{
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.data_list{
  text-align: center;
  font-size: 14px;
  color: #666;
  border-radius: 6px;
  background: #E5E9F2;
  height: 40px;
  line-height: 40px;
  padding: 0;
}
.data_head{
  font-size: 26px;
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #FF9800;
}
</style>
