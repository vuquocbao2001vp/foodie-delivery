import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import { encrypt, decrypt } from "@/constants/functions/vueCrypto";
// import VueCryptoJS from "vue-cryptojs";
// const secretKey = "3056665b-9e6e-4d7b-b0f7-4fc30a78d3fe"

import user from './modules/user.js'
import admin from './modules/admin.js'
import component from './modules/component.js'

const store = createStore({
  modules: {
    admin,
    user,
    component,
  },
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['admin', 'user'],
      // getState: (key) => {
      //   const value = localStorage.getItem(key);
      //   if (value != null) {
      //     const decrypted = VueCryptoJS.AES.decrypt(value, secretKey);
      //     return decrypted != null ? JSON.parse(decrypted) : null;
      //   }
      //   return null;
      // },
      // setState: (key, state) => {
      //   const encrypted = VueCryptoJS.AES.encrypt(JSON.stringify(state), secretKey);
      //   localStorage.setItem(key, encrypted.toString());
      // },
    })
  ],
})

export default store