import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import user from './modules/user.js'
import admin from './modules/admin.js'
import component from './modules/component.js'
import auth from './modules/auth.js'

const store = createStore({
  modules: {
    admin,
    user,
    component,
    auth,
  },
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['admin', 'user'],
    })
  ],
})

export default store