<template>
  <div id="app" class="common-layout">
    <el-container>
      <el-header>
        <p>
          <router-link to="/">Go to Home</router-link>
          <router-link to="/about">Go to About</router-link>
        </p>
      </el-header>
    </el-container>
    <el-main><router-view /></el-main>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
