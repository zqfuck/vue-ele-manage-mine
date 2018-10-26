<template>
  <div class="contain">
    <head-top></head-top>
    <div class="table_contain">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="店铺地址"
          prop="address">
        </el-table-column>
        <el-table-column
          label="店铺介绍"
          prop="description">
        </el-table-column>
        <el-table-column
          label="操作"
          width="240">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="Success"
              @click="addFood(scope.$index, scope.row)">添加食品</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
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
    <el-dialog
      title="修改店铺信息"
      :visible.sync="dialogFormVisible"
      width="30%">
      <el-form :model="selectTable">
        <el-form-item label="店铺名称" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-autocomplete
            v-model="address.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入地址"
            style="width: 100%;"
            @select="addressSelect"
          ></el-autocomplete>
          <span>当前城市：{{city.name}}</span>
        </el-form-item>
        <el-form-item label="店铺介绍" label-width="100px">
          <el-input v-model="selectTable.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="selectTable.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" label-width="100px">
          <el-cascader
            :options="categoryOptions"
            v-model="selectedCategory"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商铺图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            :action="'http://elm.cangdu.org/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleServiceAvatarScucess"
            :before-upload="beforeAvatarUpload">
            <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
import api from '@/js/api.js'
export default{
  name: 'UserList',
  data () {
    return {
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      baseImgPath:'',
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      categoryOptions: [],
      selectedCategory: [],
      address: {}
    }
  },
  components: {
    HeadTop
  },
  created () {
    this.initData()
    this.baseImgPath = api.baseImgPath()
  },
  mounted () {

  },
  methods: {
    initData () {
      let param = {type:'guess'}
      api.cityGuess(param).then(res => {
        console.log(res)
        this.city = res
        this.getResturants();
      }).catch(err => {
        console.log(err)
      })
      api.getResturantsCount().then(res => {
        this.count = res.count;
      }).catch(err => {
        throw new Error('获取数据失败')
      });
    },
    getResturants () {
      let params = {
        latitude: this.city.latitude,
        longitude: this.city.longitude,
        offset: this.offset,
        limit: this.limit
      }
      api.getResturants(params).then(res => {
        console.log(res)
        this.tableData = []
        res.forEach((item, index) => {
          const tableData = {}
          tableData.name = item.name;
          tableData.address = item.address;
          tableData.description = item.description;
          tableData.id = item.id;
          tableData.phone = item.phone;
          tableData.rating = item.rating;
          tableData.recent_order_num = item.recent_order_num;
          tableData.category = item.category;
          tableData.image_path = item.image_path;
          this.tableData.push(tableData);
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
      this.getResturants()
    },
    handleEdit (index, row) {
      console.log(index,row)
      this.selectTable = row;
      this.address.address = row.address;
      this.selectedCategory = row.category.split('/');
      console.log(this.selectedCategory)
      this.dialogFormVisible = true;
      if (!this.categoryOptions.length) {
        this.getCategory();
      }
    },
    getCategory () {
      api.foodCategory().then(res => {
        console.log(res)
        res.forEach(item => {
          if (item.sub_categories.length){
            const addNew = {
              value: item.name,
              label: item.name,
              children: []
            };
            item.sub_categories.forEach((item, index) => {
              addNew.children.push({
                value: item.name,
                label: item.name,
              })
            })
            this.categoryOptions.push(addNew)
          }
        })
      }).catch(err => {
        console.log('获取商铺种类失败', err);
      })
    },
    updateShop () {
      this.dialogFormVisible = false;
      this.selectTable.category = this.selectedCategory.join('/');
      api.updateResturant(this.selectTable).then(res => {
        console.log(res)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '更新店铺信息成功'
          });
          this.getResturants();
        }else{
          this.$message({
            type: 'error',
            message: `${res.message}或不可修改`
          });
        }
      }).catch(err => {
        console.log('更新餐馆信息失败', err);
      })
    },
    querySearchAsync (queryString, cb) {
      if (queryString) {
        try{
          let params = {
            type: 'search',
            city_id: this.city.id,
            keyword: queryString
          }
          api.searchplace(params).then(res => {
            console.log(res)
            if (res instanceof Array) {
              res.map(item => {
                item.value = item.address;
                return item;
              })
              cb(res)
            }
          }).catch(err => {
            console.log(err)
          })
        }catch(err){
          console.log(err)
        }
      }
    },
    addressSelect(vale){
      const { address, latitude, longitude } = vale;
      this.address = {address, latitude, longitude};
    },
    beforeAvatarUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    handleServiceAvatarScucess(res, file) {
      console.log(res)
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      }else{
        this.$message.error('上传图片失败！');
      }
    },
    handleDelete (index, row) {
      api.deleteResturant(row.id).then(res => {
        console.log(res)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '删除店铺成功'
          })
          this.tableData.splice(index, 1);
        }else {
          this.$message({
            type: 'error',
            message: '您的权限不足以删除此店铺'
          })
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
        console.log('删除店铺失败')
      })
    },
    addFood(index, row){
      this.$message({
        type: 'error',
        message: '开发进行中'
      })
     // this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
    },

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
  width: 40%;
}
</style>
