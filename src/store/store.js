import { createStore } from 'vuex'
import user from './modules/user.js'
import category from './modules/category.js'
import product from './modules/product.js'
import loader from './modules/loader.js'

const store = createStore({
  modules: {
    user,
    category,
    product,
    loader,
  },
})

export default store