<template>
  <LoginScreen />
  <UserScreen/>
  <AdminScreen/>
</template>

<script>
import { mapMutations} from 'vuex'
import UserScreen from '../src/screens/UserScreen/UserScreen.vue'
import AdminScreen from '../src/screens/AdminScreen/AdminScreen.vue'
import LoginScreen from '../src/screens/LoginScreen/LoginScreen.vue'
export default {
  name: 'App',
  components: {
    UserScreen,
    AdminScreen,
    LoginScreen
  },
  watch: {
    '$route.path': function(value){
      const parentRouter = value.split('/')[1];
      if(parentRouter == "auth") this.setRole("guest");
      else if(parentRouter == "admin") this.setRole("admin");
      else  this.setRole("user");
    }
  },
  methods: {
    ...mapMutations(["setRole"])
  }
}
</script>

<style>
@import url(./style/main.css);
</style>
