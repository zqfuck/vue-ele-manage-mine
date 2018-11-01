<template>
  <div class="contain">
    <head-top></head-top>
    <h2>管理员设置</h2>
    <div class="info_box">
      <p>姓名: <span>{{adminDefault.name}}</span></p>
      <p>注册时间: <span>{{registTime}}</span></p>
      <p>管理员权限: <span>{{adminDefault.limit}}</span></p>
      <p>管理员id: <span>{{adminDefault.id}}</span></p>
      <p>更换头像: </p>
      <el-form>
        <el-form-item label="" label-width="100px">
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
    </div>
  </div>
</template>

<script>
  import HeadTop from '@/components/HeadTop'
  import api from '@/js/api'
  import { mapState } from 'vuex'
  import moment from 'moment'
  export default {
    name: 'AdminSet',
    data () {
      return {
        registTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
        baseImgPath: '',
        selectTable: {
          image_path: '166cdecf41720561.jpg'
        }
      }
    },
    computed: {
      ...mapState(['adminDefault'])
    },
    components: {
      HeadTop
    },
    created() {
      this.baseImgPath = api.baseImgPath()
      console.log(this.baseImgPath)
    },
    methods: {
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
    }
  }
</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
  background: #f0efee;
}
h2{
  font-size: 34px;
  text-align: center;
  padding: 25px;
}
.info_box{
  width: 450px;
  height: auto;
  padding-bottom: 30px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  background: #f0f5f6;
  margin: 25px auto;
  padding-left: 15px;
}
.info_box p{
  font-size: 16px;
  line-height: 25px;
  margin: 15px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
