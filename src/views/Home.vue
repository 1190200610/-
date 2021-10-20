<template>
  <div class="home">
    <div>
      <h1 v-if="username.length == 0">
        请 <router-link to="/login">登录</router-link>
      </h1>
      <h1 v-else>你好 {{ username }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      username: "",
    };
  },
};
</script>
