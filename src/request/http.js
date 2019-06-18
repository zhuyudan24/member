import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';

axios.defaults.baseURL = `${window.location.origin}`;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'appliaction/x-www-form-urlencoded;charset=UTF-8';

//  Vue 导入登录token 判断状态

axios.interceptors.request.use(
  config => {
    //  判断token
    return config;
  }, error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error && error.response && error.response.status) {
      switch(error.response.status) {
        case 404:
        Message({
          message: '请求不存在',
          type: 'error'
        })
      }
      return Promise.reject(error);
    }
  }
)

/**
 * getFetch
 */

export function getFetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * postFetch
 */

export function postFetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res);
    }).then(err => {
      reject(err);
    });
  });
}
