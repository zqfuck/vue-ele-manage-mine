<template>
  <div class="contain">
    <head-top></head-top>
    <el-row style="margin: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">选择食品种类</header>
        <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
          <el-row class="category_select">
            <el-form-item label="食品种类">
              <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">
                <el-option
                  v-for="item in categoryForm.categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
            <div class="add_category">
              <el-form-item label="食品种类" prop="name">
                <el-input v-model="categoryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述" prop="description">
                <el-input v-model="categoryForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="add_category_button" @click="addCategoryFun">
            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
            <span>添加食品种类</span>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeadTop from '@/components/HeadTop'
import api from '@/js/api.js'
export default {
  name: 'AddGoods',
  data () {
    return {
      restaurant_id: 1,
      categoryForm: {
        categoryList: [],
        categorySelect: '',
        name: '',
        description: '',
      },
      foodForm: {
        name: '',
        description: '',
        image_path: '',
        activity: '',
        attributes: [],
        specs: [{
          specs: '默认',
          packing_fee: 0,
          price: 20,
        }],
      },
      foodrules: {
        name: [
          { required: true, message: '请输入食品名称', trigger: 'blur' },
        ],
      },
      attributes: [{
        value: '新',
        label: '新品'
      }, {
        value: '招牌',
        label: '招牌'
      },],
      showAddCategory: false,
      foodSpecs: 'one',
      dialogFormVisible: false,
      specsForm: {
        specs: '',
        packing_fee: 0,
        price: 20,
      },
      specsFormrules: {
        specs: [
          { required: true, message: '请输入规格', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    selectValue: function (){
      return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    }
  },
  components: {
    HeadTop
  },
  created () {
    if (this.$route.query.restaurant_id) {
      this.restaurant_id = this.$route.query.restaurant_id
    } else {
      this.restaurant_id = Math.ceil(Math.random()*10)
      this.$confirm('添加食品需要选择一个商铺，先去就去选择商铺吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/manage/shopList')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    }
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      api.getCategory(this.restaurant_id).then(res => {
        if (res.status == 1 ) {
          res.category_list.map((item, index) => {
            item.value = index;
            item.label = item.name;
          })
          this.categoryForm.categoryList = res.category_list;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addCategoryFun () {
      this.showAddCategory = !this.showAddCategory;
    },
    submitcategoryForm(categoryForm){
      this.$refs[categoryForm].validate(async (valid) => {
        if (valid) {
          const params = {
            name: this.categoryForm.name,
            description: this.categoryForm.description,
            restaurant_id: this.restaurant_id,
          }
          api.getCategory(params).then(res => {
            this.$message({
              message: '没有添加权限',
              type: 'warning'
            });
          }).catch(err => {
            this.$message({
              message: '没有添加权限',
              type: 'warning'
            });
          })
        }
      })
    }
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
.add_category_row{
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit{
  height: 185px;
}
.add_category_button{
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
  border: 1px solid #eaeefb;
  transition: all 400ms;
  margin-top: 20px;
}
.add_category_button:hover{
  background: #f9fafc;
}
.add_category_button:hover span,.add_category_button:hover .edit_icon{
  color: #20a0ff;
}
.add_category_button span{
  font-size: 14px;
  color: #999;
}
.add_category_button .edit_icon{
  color: #ccc;
  transition: all 400ms;
}
</style>
