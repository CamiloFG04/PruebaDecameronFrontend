import { createStore } from 'vuex'
import auth from '../modules/auth/store'
import hotel from '../modules/hotel/store'
export default createStore({
  modules: {
    auth,
    hotel
  }
})
