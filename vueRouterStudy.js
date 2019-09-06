前端渲染和后端渲染
服务器直接生产渲染好对应的html页面 返回给客户端进行展示，这就是后端渲染
每一个页面有对应的网址，也就是url 然后url发送给服务器 服务器对url进行匹配 最后生成html或者数据 返回给前端  这是后端路由

SPA （单页面富应用）
SPA最大的特点就是在前后端分离的基础上加了一层前端路由
也就是前端来维护一套路由规则
前端路由的核心就是改变url 但是页面不进行整体的刷新

修改 localtion.hash = 'xxx'  可以改变浏览器上的url 但是不会刷新页面
H5可以通过  history.pushState({}, '', 'url')  也可以改变url 但不会刷新页面 效果一样


修改 localtion.href = 'xxx'  也可以改变浏览器url 但是会刷新页面

所有的组件都继承自vue类的原型
所有在任意组件中都可以直接调用vue原型上的方法和属性

vue-router
一个路由映射关系就是一个对象 {} 包含了path component meta
默认情况下是has值去匹配路由 但是会在url上自动拼上一个#号
如果想改成H5的history模式的话 可以在new VueRouter({mode:'history'})设置  这样在url中就没有那个#号

router-link标签的属性：
to=''  要跳转到的组件
tag=''  其它标签名 表示渲染成指定的标签
默认是使用pushState的方式进行跳转的 如果不希望用户点击回退跳转 可以添加一个replace属性
选中的router-link有一个类名 router-link-active  可以通过给这个类名设置样式 改变它被选中时的样式
如果不想叫这个名字 可以在标签中添加active-class='你想要的类名'
如果多个标签中的这个类名都想统一修改的话 可以在new VueRouter({linkActiveClass:'你想要的类名'})设置


通过点击事件也就是代码的方式 去实现路由跳转
vuerouter往所有的组件中都添加了$router属性
this.$router.push('/xxx')   push ==＞　pushState
如果不想让用户点击回退实现切换 可以使用
this.$router.replace('/xxx')

动态路由的使用：
配置时 类似于{path:'/login/:xxx'} 使用时 v-bind:to="'/login/' + xxx"  这个xxx一般是动态获取的
可以使用$route.params.xxx 拿到这个xxx值

路由的懒加载:
const xxx = () => import('../../xxx')
 {path:'/xxx', component: xxx}
 也可以直接配置路由映射关系时{path:'/xxx', component: () => import('../../xxx')}
 一个路由懒加载对应一个JS文件

 路由的嵌套:
 在父路由映射关系中添加children属性
 children:[{path:'xxx', component:xxx}]  子路由中path不加/
 使用router-link 时  to='/xxx/xxx' 这里应该写上完整的路径

URL: 协议：//主机:端口：路径？查询
	scheme://host:port/path?query
路由的传参:
:to="{path:'/xxx', query: {name:'xxx'}}"
取值 this.$route.query.xxx


router和route:
router是全局定义的那个router实例对象
route是配置的那个路由映射{} 拿到的是处于活跃的那个路由对象

全局导航守卫:
前置守卫（guard）
router.beforeEach((to, from, next) => {
	// 从from 跳转到to 
	document.title = to.matched[0].meta.title  这样可以保证对应页面显示对应标题
	next()  一定要调用next() 不然会出错
})
后置钩子(hook)
router.afterEach((to, from) => {

})  一般这里面不需要调用next()函数
next(false) next('/') 手动修改跳转的页面
路由独享守卫  在路由映射配置中添加 {path:{}, beforeEnter:(to, from, next) => {}}
组件内的守卫  组件内使用 与vue生命周期函数同级 beforeRouterEnter(to, from, next) {}
meta: 元数据（描述数据的数据）

keep-alive:  让组件不被频繁的创建和销毁  可以使组件保留状态 会被缓存 避免重新渲染
activated()  组件活跃时触发
deactivated()  组件不活跃时触发
跟生命周期函数同级
当组件被keep-alive保存了状态时 使用这两个函数才有效

keep-alive有两个非常重要的属性
<keep-alive exclude='组件的name,xxx,xxx' include='组件的name,xxx,xxx'>
include  --字符串或正则表达式  只有匹配的组件会被缓存
exclude -- 字符串或正则表达式  任何匹配的组件都不会被缓存

router-view 也是一个组件 如果直接包在keep-alive里 所有路径匹配到的视图组件都会被缓存