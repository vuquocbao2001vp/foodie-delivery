<template>
  <LoginScreen />
  <UserScreen/>
  <AdminScreen/>
</template>

<script>
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
}
</script>

<style>
@import url(./style/main.css);
</style>
