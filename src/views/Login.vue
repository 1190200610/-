<template>
  <div class="login-container" style="text-align: center">


      <el-button-group
          style="width: 40%; margin-top: 15%; margin-right: 10%; margin-left: 12%"
      >
        <el-row style="margin-bottom: 10%; margin-left: 30%">
          <el-button
              id="login_btn"
              :loading="loading"
              type="primary"
              style="height: 80px; width:60%"
              @click="LoginOrdinary"
          >普通用户
          </el-button>
        </el-row>
        <td></td>
        <el-row style="margin-left: 30%">
          <el-button
              id="login_enroll"
              :loading="loading"
              type="danger"
              style="height: 80px; width:60%"
              @click="LoginProfession"
          >专业用户
          </el-button>
        </el-row>
      </el-button-group>


    <div class="info" style="bottom: 40px;">Beta: 1.0</div>
    <div class="info">Technical Support: XXX</div>
  </div>
</template>

<script>

export default {
  data() {
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

    async LoginOrdinary() {

      // // 登录处理
      // axios.post("后台地址", {
      //   username: "",
      //   password: "",
      // })
      // .then(function (response) {
      //   console.log(response)
      //     //  处理响应
      //     })
      // .catch(function (error) {
      //   console.log(error)
      // })
      localStorage.setItem('user', 'ordinary')
      await this.$router.push({path: '/home'})

    },

    async LoginProfession() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          localStorage.setItem('hasLogin', true)
        } else {
          alert("数据格式错误")
        }
      })

      // // 登录处理
      // axios.post("后台地址", {
      //   username: "",
      //   password: "",
      // })
      // .then(function (response) {
      //   console.log(response)
      //     //  处理响应
      //     })
      // .catch(function (error) {
      //   console.log(error)
      // })

      localStorage.setItem('user', 'profession')
      await this.$router.push({path: '/home'})
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
$bg: #2d3a4b;
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
