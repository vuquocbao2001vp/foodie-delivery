<template>
  <div v-if="loginRole=='user'" class="container">
    <BaseLoader />
    <div class="content-container">
      <TheContent/>
    </div>
    <div class="top-container">
      <TheHeader/>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/UserLayout/TheHeader.vue'
import TheContent from '@/components/layout/UserLayout/TheContent.vue'
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    TheHeader,
    TheContent
  },
  created(){
    const vuex = JSON.parse(localStorage.getItem("vuex"));
    if(vuex){
      const userToken = vuex.user.userToken;
      this.setUserToken(userToken);
    }
  },
  computed: {
    ...mapGetters(["loginRole"]),
  },
  methods: {
    ...mapMutations(["setUserToken"])
  }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
}
.top-container {
    height: 65px;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
}
.content-container {
    min-height: calc(100vh - 65px);
    width: 100%;
    box-sizing: border-box;
    margin-top: 65px;
    padding-top: 32px;
}

</style>
