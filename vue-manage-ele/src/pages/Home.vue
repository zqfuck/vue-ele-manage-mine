<template>
  <div class="">
    <head-top></head-top>
    <section>
      <h2 class="home_title">数据统计</h2>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="4"><div class="data_list"><span class="data_head">当日数据 :</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span>新增用户</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span>新增订单</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span>新增管理员</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="4"><div class="data_list"><span class="data_head">总数据 :</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span>注册用户</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span>订单</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span>管理员</div></el-col>
      </el-row>
    </section>
    <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
import Tendency from '@/components/Tendency'
import dtime from 'moment'
import api from '@/js/api.js'
export default{
  name: 'Home',
  data () {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[],[],[]],
    }
  },
  components: {
    HeadTop,
    Tendency
  },
  mounted () {
    this.initDada()
    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
      this.sevenDay.push(date)
    }
    this.getSevenData()
  },
  methods: {
    initDada () {
      var rawDate = dtime().format('YYYY-MM-DD')
      console.log(rawDate)
      Promise.all([api.userCount(rawDate), api.orderCount(rawDate), api.adminDayCount(rawDate), api.getUserCount(), api.getOrderCount(), api.adminCount()]).then(res => {
        console.log(res)
        this.userCount = res[0].count
        this.orderCount = res[1].count
        this.adminCount = res[2].count
        this.allUserCount = res[3].count
        this.allOrderCount = res[4].count
        this.allAdminCount = res[5].count
      }).catch(err => {
        console.log(err)
      })
    },
    getSevenData(){
      const apiArr = [[],[],[]]
      this.sevenDay.forEach(item => {
        apiArr[0].push(api.userCount(item))
        apiArr[1].push(api.orderCount(item))
        apiArr[2].push(api.adminDayCount(item))
      })
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[],[],[]]
        res.forEach((item, index) => {
          if (item.status == 1) {
            resArr[Math.floor(index/7)].push(item.count)
          }
        })
        this.sevenDate = resArr;
      }).catch(err => {
        console.log(err)
      })
    }
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
.data_num{
  font-size: 26px;
  color: mediumseagreen;
  margin-right: 5px;
}
</style>
