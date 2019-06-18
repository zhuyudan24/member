import axios from 'axios'
import qs from 'qs'

export function fetch(url, options) {
  return new Promise((resolve, reject) => {
    axios.post(url, options).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  })
}
export function fetchqs(url,options) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(options)).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  })
}

