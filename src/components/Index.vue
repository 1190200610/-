<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../icon/huawei_logo.png" alt="" width="180" height="40">
        <span>

        </span>
      </div>
      <el-button @click="logout">Logout</el-button>
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

          <el-menu-item index="upload">
            <template v-slot:title>
              <i class="el-icon-upload"></i>
              <span>Upload Data</span>
            </template>
          </el-menu-item>

          <el-menu-item index="collection">
            <i class="el-icon-collection"></i>
            <span>Data Collection</span>
          </el-menu-item>

          <el-menu-item index="index">
            <i class="el-icon-document-checked"></i>
            <span>Data Index</span>
          </el-menu-item>

        </el-menu>

      </el-aside>
      <el-main>
        <div>
          <h3> 兄弟 在这里面写 </h3>

        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      username: localStorage.getItem('username'),
    }
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
