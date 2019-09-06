devDependencies 开发时依赖             --save-dev
dependenceis  运行时依赖

在终端运行的命令都是全局的 
但是在package.json 下scripts脚本里定义的命令会在本地里面找 本地没找到才会使用全局的
也就是说 这个脚本首先会去本地的node_modules/bin目录中对应的命令 没有找到就会去全局的
环境变量中寻找
### package.json 下面的scripts中的键值对表示
当运行npm run xxx 的时候 会去package.json里的scripts下找到对应键值xxx 然后再去运行xxx值的命令  这就是一层映射

## 要能解析打包css文件 首先要安装依赖 css-loader 然后再去webpack.config.js里去配置对应的规则

### babel npm install --save-dev babel-loader@7 babel-core babel-preset-es2015

1.runtime-only -->代码中　不可以有任何的template
2.runtime-compiler --> 代码中可以有template 因为有compiler 可以用于编译template 
需要2运行环境时可以去webpack.config.js中配置resolve

SPA(Single Page Application) 单页应用程序
概念： 只有一个web页面的应用 是加载单个html页面 并在用户与应用程序交互时动态更该页面的web应用程序

npm install vue-loader vue-template-compiler --save-dev

##webpack 插件的使用
在配置文件中
const webpack = require('webpack)

module.exports = {
  plugins: [ 
    new webpack.BannerPlugin('最终版权归xxx所有')  这是webpack 自带的插件 这样会在打包文件顶部加上这个信息
  ]
}

###打包html的插件
npm install html-webpack-plugin --save-dev
同样在配置文件中
const HtmlWebpackPlugin = require('html-webpack-plugin ')
new HtmlWebpackPlugin()

###js压缩的插件
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev

const uglifyjsPlugin = require('uglifyjs-webpack-plugin')

new uglifyjsPlugin()

###搭建本地服务器
npm install --save-dev webpack-dev-server@2.9.1
然后在配置文件中添加
devServer:{
  contentBase: './dist'   //表示用于服务这个文件夹
  inline: true    实时监听
  port: 8080   // 选择端口 不写的话默认就是8080
}