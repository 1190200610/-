<template>
  <div>
    {{ loginname }}
    <SHTTPClient ref="shttp_client" negotiateURL="http://localhost:8899"/>
    <el-row>
      <el-col :span="4" :offset="8">用户名</el-col>
      <el-col :span="4"
      >
        <el-input v-model="loginname" placeholder="Please input"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="8">密码</el-col>
      <el-col :span="4"
      >
        <el-input
            v-model="password"
            placeholder="Please input password"
            show-password
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-button type="primary" round @click="onLogin">登录</el-button>
        <el-button type="primary" round @click="onEnroll">注册</el-button>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>


<script>
import SHTTPClient from "../components/SHTTPClient.vue";

export default {
  data() {
    return {
      loginname: "",
      password: "",
    };
  },
  components: {
    SHTTPClient,
  },
  methods: {
    async onLogin() {
      const client = this.$refs.shttp_client;
      let res = await client.post(
          "http://localhost:8899/login",
          JSON.stringify({
            data: {
              username: this.loginname,
              password: this.password,
            },

          })      );
      console.log(res)
      let loginResult = JSON.parse(res.data);
      console.log(loginResult);
      if (loginResult.code == 200) {
        localStorage.setItem('hasLogin', true)
        localStorage.setItem('token', loginResult.data)
        this.$alert('登陆成功', {
          confirmButtonText: '确定',
          // eslint-disable-next-line no-unused-vars
          callback: action => {
            this.$message({
              type: 'info',
              message: '登陆成功'
            });
          }
        });
      } else {
        this.$alert('登陆失败', {
          confirmButtonText: '确定',
          // eslint-disable-next-line no-unused-vars
          callback: action => {
            this.$message({
              type: 'info',
              message: '请检查用户名与密码'
            });
          }
        });
      }
    },

    async onEnroll() {
      await this.$router.push("/register")
    }
  },
};
</script>
