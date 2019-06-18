import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
// import ElementUI from 'element-ui'
import '../elethem/index.css'
import '../static/css/index.styl'
import '../static/font/iconfont.css'
import gicinput from './common/gicinput'
import gictextarea from './common/gictextarea'
import 'babel-polyfill';

// import vueGicCard from '@gic-test/vue-gic-card'
// import vueGicStore from '@gic-test/vue-gic-store'
// import vueGicPeople from '@gic-test/vue-gic-people/src/lib'
// import vueGicAsideMenu from '@gic-test/vue-gic-aside-menu'
// import vueGicUploadImage from '@gic-test/vue-gic-upload-image'
// import vueGicFooter from '@gic-test/vue-gic-footer'

import * as custom from './common/filters/custom'
Vue.config.productionTip = false;
Vue.config.devtools = true;
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;


Vue.component('gic-textarea', gictextarea);
Vue.component('gic-input', gicinput);

// Vue.use(ElementUI);
// Vue.use(vueGicPeople);
// Vue.use(vueGicStore);
// Vue.use(vueGicCard);
// Vue.use(vueGicAsideMenu)
// Vue.use(vueGicFooter)
// Vue.use(vueGicUploadImage)


axios.interceptors.request.use(
  config => {
    if (!config.headers.sign && localStorage.getItem('signId')) {
      config.headers.sign = localStorage.getItem('signId');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    const CODE = response.data.errorCode;
    switch(CODE) {
      case 0:
        if (response.data.result && response.data.result.enterpriseId) {
          let signId = response.data.result.enterpriseId;
          localStorage.setItem('signId', signId);
        }
        break;
      case 401:
        const host = window.location.origin;
        window.location.href = host.indexOf('localhost') > -1 ? 'http://localhost:8002/#/login' : `${host}/gic-web/#/`;
        break;
      case 404:
        break;
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  });
Object.keys(custom).forEach(key => {
  Vue.filter(key,custom[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
