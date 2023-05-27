<template>
  <div class="content">
    <router-view></router-view>
  </div>
  <div v-if="isShowContact" class="contact">
    <ContactPage />
  </div>
</template>
<script>
import ContactPage from "@/screens/UserScreen/ContactPage/ContactPage.vue";
export default {
  components: {
    ContactPage,
  },
  data() {
    return {
        isShowContact: true,
    }
  },
  watch: {
    "$route.path": function(value){
      if(value == '/menu' || value == '/contact') this.isShowContact = false;
      else this.isShowContact = true
    }
  },
  created(){
    if(this.$route.path == '/menu' || this.$route.path == '/contact') this.isShowContact = false;
      else this.isShowContact = true
  }
};
</script>
<style scoped>
.content {
  width: 100%;
}
</style>