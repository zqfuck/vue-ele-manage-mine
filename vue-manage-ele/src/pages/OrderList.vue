<template>
  <div class="contain">
    <head-top></head-top>
    <div class="table_contain">
      <el-table
        :data="tableData"
        @expand-change='expandChange'
        :row-key="row => row.index"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名" >
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.restaurant_address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="订单 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="总价格"
          prop="total_amount">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status">
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
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      restaurant_id: null,
      expendRow: []
    }
  },
  components: {
    HeadTop
  },
  created () {
    this.restaurant_id = this.$route.query.restaurant_id
    this.initData()
  },
  mounted () {

  },
  methods: {
    initData () {
      let params = {
        restaurant_id: this.restaurant_id
      }
      api.getOrderCount(params).then(res => {
        console.log(res)
        if (res.status == 1) {
          this.count = res.count;
        }else{
          throw new Error('获取数据失败');
        }
      }).catch(err => {
        console.log(err)
      })
      this.getOrders()
    },
    getOrders () {
      let params = {
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      }
      api.getOrderList(params).then(res => {
        console.log(res)
        this.tableData = []
        res.forEach((item, index) => {
          const tableData = {}
          tableData.id = item.id;
          tableData.total_amount = item.total_amount;
          tableData.status = item.status_bar.title;
          tableData.user_id = item.user_id;
          tableData.restaurant_id = item.restaurant_id;
          tableData.address_id = item.address_id;
          tableData.index = index;
          this.tableData.push(tableData);
        })
      }).catch(err => {
        console.log(err)
      })
    },
    expandChange (row, status){
      var restaurant;
      var userInfo;
      var addressInfo;
      console.log(...row)
      if (status) {
        api.getResturantDetail(row.restaurant_id).then(res => {
           restaurant = res
           console.log(restaurant)
          //this.tableData.splice(row.index, 1,{...row,...{restaurant_name: restaurant.name, restaurant_address: restaurant.address}})
        })
        api.getUserInfo(row.user_id).then(res => {
            userInfo = res
          //this.tableData.splice(row.index, 1,{...row,...{address: userInfo.address}})
        })
       api.getAddressById(row.address_id).then(res => {
           addressInfo = res
        // this.tableData.splice(row.index, 1,{...row,...{user_name: addressInfo.username}})
        })
        setTimeout(() => {
          this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
        },500)
      }else{

      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getOrders()
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
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
</style>
