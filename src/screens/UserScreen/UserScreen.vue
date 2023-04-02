<template>
  <div v-if="loginRole!='admin'" class="container">
    <div class="top-container">
      <TheHeader/>
    </div>
    <div class="content-container">
      <TheContent/>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/UserLayout/TheHeader.vue'
import TheContent from '@/components/layout/UserLayout/TheContent.vue'
import { mapGetters } from "vuex";

export default {
  components: {
    TheHeader,
    TheContent
  },
  computed: {
    ...mapGetters(["loginRole"]),
  },
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
    z-index: 1000;
}
.content-container {
    min-height: calc(100vh - 65px);
    width: 100%;
    box-sizing: border-box;
    margin-top: 65px;
}

</style>
