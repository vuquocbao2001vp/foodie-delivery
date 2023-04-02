<template>
  <UserScreen/>
  <AdminScreen/>
</template>

<script>
import UserScreen from '../src/screens/UserScreen/UserScreen.vue'
import AdminScreen from '../src/screens/AdminScreen/AdminScreen.vue'
export default {
  name: 'App',
  components: {
    UserScreen,
    AdminScreen
  },
}
</script>

<style>
@import url(./style/main.css);
</style>
