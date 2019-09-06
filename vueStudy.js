对象中当属性名和属性值相同时  可以只简写一个属性名  这是字面量增强的写法

filter(function(n){
	return boolean     返回值是true 就将这个值添加到新数组中 false 就不添加
})        
map(function(n){
	return n....       返回值是将遍历的每一项进行操作之后的值 然后放入新数组中
})
reduce(function(preValue,n){
	return ...
},0)                  preValue是上一次return返回的值   0 是默认的初始值 最后返回一个值

v-model 修饰符
v-model.lazy = 'xxx'   懒加载 当输入框没有聚焦或者回车之后 数据双向绑定才实现
v-model.number = 'xxx'  确保输入框中输入的是数字类型
v-model.trim = 'xxx'   去除字符串左右两边的空格

为什么组件data必须是函数
保证每次返回都是一个新的对象  相互之间互不影响 

父组件访问子组件使用$ref reference(引用) 或者 $children (用的相对较少)
子组件访问父组件 $parent (用的极少)
访问根组件 $root (用的极少)

具名插槽 <slot name='xxx'>   使用时<div slot='xxx'>

作用域：
<div id='app'>
	<component v-show='xxx'>   组件标签里的变量xxx使用的是实例里定义的变量
</div>	

<temple id='component'>
	<span v-show='xxx'>        组件模版里使用的变量xxx是组件自己内部定义的变量
</temple>

解决JS文件变多导致可能会出现变量全局污染的办法
匿名函数 或者script标签中加上type='module'
CommonJS 导入导出规范
module.exports = {}     var {xxx,xxx} = require('./xx') 或者 var xx = require('../	')

export 导出时名字是什么  import 引入时名字就得是什么 
export default 导出时 不管名字  import 引入时可以自己命名   但是这种形式在同一模块只能导出一次

如果需要两个请求的结果都获取到之后在做操作 可以使用Promise.all()去操作 里面传可遍历数组
Promise.all([
	new Promise((resolve, reject) => {
		异步操作（比如异步请求）
		resolve('请求成功')
	}),
	new Promise((resolve, reject) => {
		resolve('请求2成功')
	})
]).then(results => {
	console.log(results)    //results 是一个数组 分别是两个promise的resolve结果
})

箭头函数中的this 是向外层作用域中 一层层查找this 直到有this的定义


vue 如果需要在DOM加载完成后获取DOM的动态属性，请使用updated生命周期，
mounted有的时候获取不到该dom的属性，就要使用setTimeout，

最好的办法是在updated中直接获取dom的属性。

原因是：dom动态属性是在页面动态属性挂载完成才赋值的，mounted是在dom节点挂载完执行的，这时候动态属性并没有赋值。而在赋值的一瞬间 updated生命周期就监听到了。

2.发送接口请求应该在created生命周期中执行，这样比较快也不会出问题