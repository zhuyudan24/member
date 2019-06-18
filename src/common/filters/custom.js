let formatTime = val => {
  if(val) {
    let date = new Date(val);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0'+ (date.getDate()): date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
  }else {
    return '--'
  }
}
let formatYMD = val => {
  if(val) {
    let date = new Date(val);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0'+ (date.getDate()): date.getDate());
    return Y+M+D;
  }else {
    return '--'
  }
}
let fomatNumber = val => {
  if(val) {
    return val
  }else {
    return 0;
  }
}
let fomatText = val => {
  if (val) {
    return val;
  } else {
    return '--';
  }
}
let fomatFloat = val => {
  if (val || val == 0) {
    return parseFloat(val).toFixed(2)
  } else {
    return '--';
  }
  
}
let defaultImg = val => {
  if(!val) {
    return './static/img/default.png'
  }
}
export { formatTime,fomatNumber,fomatText,formatYMD,fomatFloat,defaultImg }
