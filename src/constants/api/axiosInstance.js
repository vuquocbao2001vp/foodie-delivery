import { reactive } from 'vue';
import axios from 'axios';
// import VueAxios from 'vue-axios';

const state = reactive({
  baseURL: 'https://whispering-dusk-25410.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const axiosInstance = axios.create({
  baseURL: state.baseURL,
  headers: state.headers,
});

export default axiosInstance
