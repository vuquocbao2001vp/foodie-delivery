<template>
  <div v-if="loginRole == 'guest'" class="login-screen flex">
      <router-view></router-view>
      <BaseLoader />
    </div>
  
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["loginRole"]),
  },
  methods: {
    ...mapMutations(["setRole"]),
  }
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