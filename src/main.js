// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false

// 可以在 Vue 的任何组件中通过 this.$http 来访问 axios 实例，从而发送 HTTP 请求。
axios.defaults.baseURL = 'http://localhost:8080';
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
