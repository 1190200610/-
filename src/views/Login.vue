<template>
  <div class="login-container" style="text-align: center">
    <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
    >
      <div class="title-container">
        <img src="../icon/huawei_logo.png" alt="" width="180" height="40"/>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick" style="">
        <el-tab-pane label="普通用户" name="first"></el-tab-pane>
        <el-tab-pane label="专业用户" name="second"></el-tab-pane>
      </el-tabs>


      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
            id="account"
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
            id="psw"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="text"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button-group
          style="width: 100%; margin-bottom: 30px;"
      >
        <el-button
            id="login_btn"
            :loading="loading"
            type="info"
            style="width:40%;margin-bottom:30px; margin-left: 30%"
            @click="LoginOrdinary"
        >登录
        </el-button>
      </el-button-group>
    </el-form>

    <div class="info" style="bottom: 40px">Beta: 1.0</div>
    <div class="info">Technical Support: XXX</div>
  </div>
</template>

<script>

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',

      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单的验证规则
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }


  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

    handleClick(tab, event) {
      console.log(tab, event);
    },


    async LoginOrdinary () {
      this.axios({
        method: 'post',
        url: 'http://127.0.0.1:10000/api/login',
        data: {
          id: 'ordinary'
        },
      })
        .then((response) => {
          this.$message({
            message: '以普通用户身份登录',
            type: 'success',
            duration: 1000,
          })
          console.log(response, 'success')
        })
        .catch((error) => console.log(error, 'error'))
      localStorage.setItem('user', 'ordinary')
      await this.$router.push({ path: '/InDBMLUse' })
    },

    async LoginProfession () {
      this.axios({
        method: 'post',
        url: 'http://127.0.0.1:10000/api/login',
        data: {
          id: 'profession'
        },
      })
        .then((response) => {
          this.$message({
            message: '以专家用户身份登录',
            type: 'success',
            duration: 1000,
          })
          console.log(response, 'success')
        })
        .catch((error) => console.log(error, 'error'))
      localStorage.setItem('user', 'profession')
      await this.$router.push({ path: '/InDBMLUse' })
    },
  }
};
</script>



<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
.info {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: gainsboro;
}

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ADAFB1;
//$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  padding: 0px;
  magrin: 0px;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
