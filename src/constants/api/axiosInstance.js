import { reactive } from 'vue';
import axios from 'axios';

const state = reactive({
  // adminURL: 'https://whispering-dusk-25410.herokuapp.com/api/admin',
  baseURL: 'https://whispering-dusk-25410.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const adminAxios = axios.create({
  baseURL: state.baseURL ,
  headers: state.headers,
  transformRequest: [(data, headers) => {
    if (data instanceof FormData) {
      // Set 'Content-Type' to 'multipart/form-data' for requests that contain a FormData object
      headers['Content-Type'] = 'multipart/form-data';
      return data;
    }
    // Handle other data formats as desired
    headers['Content-Type'] = 'application/json';
    return JSON.stringify(data);
  }],
});

export const userAxios = axios.create({
  baseURL: state.baseURL ,
  headers: state.headers,
  transformRequest: [(data, headers) => {
    if (data instanceof FormData) {
      // Set 'Content-Type' to 'multipart/form-data' for requests that contain a FormData object
      headers['Content-Type'] = 'multipart/form-data';
      return data;
    }
    // Handle other data formats as desired
    headers['Content-Type'] = 'application/json';
    return JSON.stringify(data);
  }],
});

export const guestAxios = axios.create({
  baseURL: state.baseURL ,
  headers: state.headers,
  transformRequest: [(data, headers) => {
    if (data instanceof FormData) {
      // Set 'Content-Type' to 'multipart/form-data' for requests that contain a FormData object
      headers['Content-Type'] = 'multipart/form-data';
      return data;
    }
    // Handle other data formats as desired
    headers['Content-Type'] = 'application/json';
    return JSON.stringify(data);
  }],
});
