<template>
  <div class="contain">
    <head-top></head-top>
    <div class="table_contain">
      <el-table
        :data="tableData"
        :border="false"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          property="registe_time"
          label="注册日期"
          width="220">
        </el-table-column>
        <el-table-column
          property="username"
          label="用户姓名"
          width="220">
        </el-table-column>
        <el-table-column
          property="city"
          label="注册地址">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
import api from '@/js/api.js'
export default{
  name: 'UserList',
  data () {
    return {
      tableData: [{
        registe_time: '2016-05-02',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1518 弄'
      }, {
        registe_time: '2016-05-04',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1517 弄'
      }, {
        registe_time: '2016-05-01',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1519 弄'
      }, {
        registe_time: '2016-05-03',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1516 弄'
      }],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    }
  },
  components: {
    HeadTop
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      api.getUserCount().then(res => {
        console.log(res)
        if (res.status == 1) {
          this.count = res.count;
        }else{
          throw new Error('获取数据失败');
        }
      }).catch(err => {
        console.log(err)
      })
      this.getUserList()
    },
    getUserList () {
      let params = {
        offset: this.offset,
        limit: this.limit
      }
      api.getUserList(params).then(res => {
        console.log(res)
        this.tableData = []
        res.forEach(item => {
          const tableData = []
          tableData.username = item.username
          tableData.registe_time = item.registe_time
          tableData.city = item.city
          this.tableData.push(tableData)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getUserList()
    }
  }
}
</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
}
.table_contain{
  padding: 20px;
}
</style>
