import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios

const axiosInstance = axios.create({
    baseURL: 'https://assets-api.dev.sandbox3000.com/api',
   // baseURL: 'http://127.0.0.1:8000/api',
   headers:{'Authorization' : 'Bearer ' + localStorage.getItem("token")}
})

export default({Vue}) => {
    Vue.prototype.$axios = axiosInstance
}

export{ axiosInstance }