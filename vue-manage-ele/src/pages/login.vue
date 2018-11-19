<template>
  <div class="fillcontain">
    <transition name="form-fade" mode="in-out">
      <div class="form_container" v-show="showLogin">
        <div class="login_title">
          <p>ele管理后台</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/js/api.js'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      showLogin: false
    }
  },
  created () {
    if (!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  computed: {
    ...mapState( ['adminInfo'] )
  },
  mounted () {
    this.showLogin = true
  },
  methods: {
    ...mapActions(['getAdminData']),
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            user_name: this.loginForm.username,
            password: this.loginForm.password
          }
          api.login(params).then(res => {
            console.log(res)
            if (res.status == 1){
              this.$message({
                message: '登录成功了啊',
                duration: '1500',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('manage')
              }, 2000)
            }
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err.message
            });
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          });
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.fillcontain{
  width: 100%;
  height: 100%;
  background: #324057;
}
.form_container{
  width: 320px;
  height: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -105px;
  margin-left: -160px;
  padding: 25px;
  background: #fff;
}
.login_title{
  width: 100%;
  position: absolute;
  left: 0;
  top: -100px;
  font-size: 35px;
  color: #fff;
  text-align: center;
  line-height: 30px;
}
.tip{
  width: 100%;
  color: red;
  text-align: center;
  font-size: 12px;
  margin: 6px 0;
}
.submit_btn{
  width: 100%;
}
.form-fade-enter-active,.form-fade-leave-active{
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active{
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
