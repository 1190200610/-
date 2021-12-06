<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../icon/huawei_logo.png" alt="" width="180" height="40"/>
        <span> </span>
      </div>
      <el-button @click="logout">Logout</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '65px' : '200px'"  style="background-color: #545c64">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
            default-active="2"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
        >
          <el-menu-item index="upload">
            <template v-slot:title>
              <i class="el-icon-upload"></i>
              <span style="color: #000000">Upload Data</span>
            </template>
          </el-menu-item>

          <el-menu-item index="collection">
            <i class="el-icon-collection"></i>
            <span style="color: #000000">Data Collection</span>
          </el-menu-item>

          <el-menu-item index="index">
            <i class="el-icon-document-checked"></i>
            <span>Data Index</span>
          </el-menu-item>

          <el-menu-item index="InDbML">
            <i class="el-icon-document"></i>
            <span style="color: #000000">In-DB ML</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="display: inline-block; text-align: center">
          <button class="button" style="background-color:#545c64; vertical-align: middle" @click="jump">
            <span>传统索引</span>
          </button>
          <button class="button" style="background-color:#545c64; vertical-align: middle" @click="jump">
            <span>学习索引</span>
          </button>
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
    },
    jump() {
      this.$router.push({path: '/scene'})
    }
  }

}


</script>

<style scoped>
.home-container {
  height: 100vh;
}

.el-header {
  background-color: #373d41;
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

.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}
.el-col {
  text-align: center;
  border-radius: 4px;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* text-align: center; */
  /* position: relative; */
  background-color: #eaedf1;
}

.button {
  display: inline-block;
  border-radius: 10px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 80vh;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "»";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
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
