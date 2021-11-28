<template>
  <SHTTPClient ref="shttp_client" negotiateURL="https://zzdirty.cn:12002"/>
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
            :collapse-transition = false
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
        <div>
          <el-descriptions title="用户信息">
            <el-descriptions-item label="用户名" v-model="username">{{ username }}</el-descriptions-item>
            <el-descriptions-item label="手机号">15945984760</el-descriptions-item>
            <el-descriptions-item label="居住地">哈尔滨市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">黑龙江省哈尔滨市南岗区先锋路92号</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SHTTPClient from "../../src/components/SHTTPClient.vue";
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      username: localStorage.getItem('username'),
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
z
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
