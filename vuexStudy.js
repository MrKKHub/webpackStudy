Vuex 状态管理规则  发布               提交
                 Dispatch			commit              Mutate			render		
Vue components ---------->Actions-----------> Mutation---------->State----------->Vue components
                                               |Devtools| 
                                              这是vue开发的浏览器插件 可以记录每次修改state的状态 方便跟踪状态，查错
                                              但是如果绕过Mutation 直接去修改state 也可以修改 但是不会进行记录 不方便调错

vue 推荐这种流程状态去管理数据   但是也可以跳过action 直接通过mutation去提交改变
	但是当有异步操作时  异步操作要放在action中去（一般是网络请求） 

const store = new Vuex.Store({
	state:{},
	mutations:{},
	actions:{},
	getters:{},
	modules:{}
})

Vuex提出使用单一状态树 也就是所谓的单一数据源
推荐把所有的数据都存放到一个store里去

getters相当于组件中的计算属性 
getters传参  getters:{ 
	increment (state) {},          state是默认参数 state.xxx可以拿到state里的数据
	add (state, getters) {},    getters就是	getters属性 getters.xxx 就可以拿到这里面的其它方法 
}
如果使用getters里属性的时候想穿指定参数的话 可以通过以下方式
getters:{
	add (state) {
		return funciton (xxx) {
			return state.xxx * xxx  
		}
	}
}                      调用的时候就可以  {{$store.getters.add(xxx)}}

Vuex的store状态的更新唯一方式： 提交Mutation
Mutation主要包括两部分   字符串的事件类型（type） 一个回调函数，该回调函数的第一个参数就是state
定义方式：   mutations:{
				add (state) {               这个add就是type 后面的函数就是回调函数

				}
			}
使用：  this.$store.commit('add')
传参使用 add (state, xxx) {}          this.$store.commit('add', xxx)  多个参数的话一般放在一个对象里统一传过去
		这种形式成为 payload (负载)    参数被称为是mutation的载荷（Payload）
关于Mutation 提交的风格 
以上是普通的提交风格
下面是特殊的提交风格：  this.$store.commit({
						type: 'add',  mutations里定义的方法名
						xxx,         参数
					})
如果用这种特殊风格提交的话  那么对应的mutation里 add (state, xxx) {}
						这个xxx 就不单单是传过来的一个参数了 而是一个对象｛type:'add',xxx:xxx｝
						这个时候想要拿到参数 就要 xxx.xxx了 一般会把这个形参写成payload  payload.xxx拿参数

只有在store中初始化的数据才是响应式的
但是也有办法让动态新增数据也是响应式的 
state.obj['address'] = 'china'  这样会添加进store但不会更新到页面 不是响应式的
Vue.set(state.obj, 'address', 'china')这样添加进去的数据是响应式的
delete state.obj.address 这样删除不是响应式的
Vue.delete(state.obj.address) 这样删除是响应式的

Vuex要求Mutation里的方法必须是同步方法
因为当使用devtools时可以帮我们捕捉mutation快照
但是如果是异步操作 那么devtools将不能很好的追踪这个操作什么时候会被完成

有异步操作时放在actions里去操作
actions:{
	默认参数是content: 上下文
	aSum(context){
		setTimeout(() =>{
			context.commit('mutation里的方法名')
		},1000)
	}
}  此时组件methods里应该 通过this.$store.dispatch('aSum') 方式提交  如果传参的话也是(context, payload)

const moduleA = {
	state:{name:'xxx'},
	mutations:{},
	getters:{},
	actions:{
		aSum(context){}    这里的context调用的是自己模块里的mutations
	}
}

modules:{
	a:moduleA
}                      使用时 $store.state.a.name  mutations getters 等 使用方式和之前一样
