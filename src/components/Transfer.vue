<template>
  <SHTTPClient ref="shttp_client" negotiateURL="http://localhost:8888"/>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../icon/icon.svg" alt="">
        <span>
          银行后台管理系统
        </span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse"> |||
        </div>
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened :collapse="isCollapse"
            :collapse-transition=false
            :router="true"
        >
          <!--          一级菜单-->
          <el-menu-item index="userInfo">
            <template v-slot:title>
              <i class="el-icon-user"></i>
              <span>用户信息</span>
            </template>
          </el-menu-item>
          <!--          二级菜单-->
          <el-menu-item index="transfer">
            <i class="el-icon-position"></i>
            <span>转账功能</span>
          </el-menu-item>
          <!--          三级菜单-->
          <el-menu-item index="notes">
            <i class="el-icon-document-checked"></i>
            <span>转账记录</span>
          </el-menu-item>
          <!--          四级菜单-->
          <el-menu-item index="charge">
            <i class="el-icon-bank-card"></i>
            <span>用户充值</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-main>
        <el-input v-model="dst_account" placeholder="请输入用户名" style="width: 70%;"></el-input>
        <el-input v-model="num" placeholder="请输入金额" style="width: 70%;"></el-input>
        <el-button
            style="width:70%;margin-bottom:20px;"
            @click="submit"
        >提交
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SHTTPClient from "../../../vue-template/src/components/SHTTPClient.vue";

export default {
  data() {
    return {
      isCollapse: false,
      dst_account: "",
      num: ""
    }
  },
  components: {
    SHTTPClient,
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    async submit() {
      const client = this.$refs.shttp_client;
      console.log(this.dst_account)
      console.log(localStorage.getItem('token'))
      let res = await client.post(
          "http://localhost:8888/user/transfer",
          JSON.stringify({
            data: {
              jwtToken: localStorage.getItem('token'),
              cur_account: localStorage.getItem('username'),
              dst_account: this.dst_account,
              num: this.num,
            },
          })
      );
      let result = JSON.parse(res.data);
      console.log(result)
      if (result.code == 200) {
        this.$alert("转账成功")
      } else {
        this.$alert("转账失败，用户不存在/余额不足")
      }
    }
  }

}

</script>

<style scoped>

.home-container {
  height: 100vh;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

> div {
  display: flex;
  align-items: center;

span {
  margin-left: 15px;
}

}
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}


</style>
