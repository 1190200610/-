<template>
  <div>
    <SHTTPClient ref="shttp_client" negotiateURL="https://zzdirty.cn:12002"/>
    <el-button
        id="login_btn"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="handleLogin"
    >测试
    </el-button>
  </div>
</template>

<script>
import SHTTPClient from "../../src/components/SHTTPClient.vue";
export default {
  name: "Test",

  components: {
    SHTTPClient,
  },

  methods: {

    async handleLogin() {
      const client = this.$refs.shttp_client;
      let res = await client.post(
          "https://zzdirty.cn:12002/trans/1/zhang/10000");
      console.log(res)


    },


  },


}
</script>

<style scoped>

</style>
