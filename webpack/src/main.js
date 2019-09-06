// 使用commonJs的模块化规范
const {add} = require('./js/mathUtil')

// 依赖css文件
require('./css/normal.css')

// 依赖less文件
require('./css/special.less')

document.write('你好')
document.writeln('我不好') // writeln 写出来的东西会自动换行 
console.log(add(10,20))

// 使用vue 进行开发
import Vue from 'vue'

// import App from './vue/app' 

import App from './vue/App.vue'
const app = new Vue({
  el: '#app',
  // template: `<h1>{{msg}}</h1>`,   vue内部会把这个template里的代码复制到index.html中 如果同时有el的话 会替换el元素里的内容
  template: '<App/>',  // 这个就等于直接在el绑定的元素中使用<App>这个组件
  components: {
    App
  }
})