Vue-Cli 
安装 npm install -g @vue-cli  会装最新版本

vue --version 可以查看脚手架版本
如果安装3版本后还想要使用2.xx版本 需要手动拉取
npm install @vue/cli-init -g
这样就可以2.x和3.x都可以使用了


Vue-Cli2 初始化项目
vue init webpack '项目名'

创建项目时两个选择   他们的区别
runtime-only
render --> vdom --> UI (性能更高，代码量更少)

runtime-compiler 
template --> ast --> render --> vdom --> UI  
之后创建项目尽量选择前者

render: c => c(App)
实际上这个c 是一个函数 createElement() 这个函数可以传三个参数（'标签名', {标签的属性}, ['内容']）
						例如： （'h1', {class:'box'}, ['我是h2标签 ']）
关闭eslint  在配置文件config文件夹下的index文件中找到 useEslint: fasle 改成这样就可以了

vue-Cli3 创建项目
vue create 项目名

new Vue({
	render: c => c(App)
}).$mount('#app')



