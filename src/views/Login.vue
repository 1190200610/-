<template>
  <div class="login">
    {{ loginuname }}
    <SHTTPClient ref="shttp_client" negotiateURL="http://localhost:8899" />
    <el-row>
      <el-col :span="4" :offset="8">用户名</el-col>
      <el-col :span="4"
        ><el-input v-model="loginuname" placeholder="Please input"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="8">密码</el-col>
      <el-col :span="4"
        ><el-input
          v-model="password"
          placeholder="Please input password"
          show-password
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="8">
        <el-button type="primary" round @click="onLogin">登录</el-button>
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
      loginuname: "",
      password: "",
    };
  },
  components: {
    SHTTPClient,
  },
};
</script>
