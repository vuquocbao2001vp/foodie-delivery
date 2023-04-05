<template>
  <div v-if="loginRole == 'guest'" class="login-screen flex">
      <router-view></router-view>
    </div>
  
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["loginRole"]),
  },
  
};
</script>

<style scoped>
.login-screen {
  width: 100%;
  height: 100vh;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  top: 0;
}
</style>