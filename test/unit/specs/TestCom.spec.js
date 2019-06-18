import Vue from 'vue';
import TestCon from '@/test/TestCom';

describe('Test.vue', () => {
  let vm;
  it('测试TestCom组件值是否显示正常', done => {
    vm = new Vue(TestCon).$mount();
     console.log(vm.msg);
    vm.msg = '测试';
    Vue.nextTick(_ => {
      expect(vm.msg).to.equal('测试');
    });
  });
});