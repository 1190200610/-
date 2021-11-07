<template>
  <SHTTPClient ref="shttp_client" negotiateURL="http://localhost:8899"/>
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

        <el-table
            :data="tradeData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="date"
              label="日期"
              width="180">
          </el-table-column>
          <el-table-column
              prop="dst_account"
              label="目的账户"
              width="180">
          </el-table-column>
          <el-table-column
              prop="num"
              label="金额">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SHTTPClient from "../../../vue-template/src/components/SHTTPClient.vue";

export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,

      tradeData: [

      ],

      data: "",
    }
  },
  components: {
    SHTTPClient,
  },

  async mounted() {
    const client = this.$refs.shttp_client;
    let res = await client.post(
        "http://localhost:8899/user/trade",
        JSON.stringify({
          data: {
            jwtToken: localStorage.getItem('token'),
            username: localStorage.getItem('username'),
          },
        })
    )

    let result = JSON.parse(res.data);
    console.log(result)
    if (result.code == 200) {
      let that = this
      for (let i = 0; i < result.data.length; i++) {
        console.log(result.data[i].dateTime + result.data[i].dst_account + result.data[i].num)
        that.tradeData.push({
          date: result.data[i].dateTime,
          dst_account: result.data[i].dst_account,
          num: result.data[i].num,
        })

      }
      console.log(that.tradeData)
    } else {
      alert("查询失败！")
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
