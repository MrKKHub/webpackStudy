const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin ')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    // 通过path模块动态的获取路径 
    // resolved（）函数将两个路径进行一个拼接 __dirname保存当前文件所在的路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'  // 公共路径 只要涉及url的都会在前面拼接上dist/   后面打包index.html的时候就不需要这个配置了
  },
  plugins: [ 
    new webpack.BannerPlugin('最终版权归xxx所有'),  // 这是webpack 自带的插件 这样会在打包文件顶部加上这个信息
    new HtmlWebpackPlugin({
      template: 'index.html'     // 这步会帮我们打包webpack.config.js下的index.html文件到dist
    }),
    new UglifyjsWebpackPlugin()   // 压缩js 代码
  ],
  module: {
    rules: [
      {
        // .因为有特殊含义所以需要\去转译 $表示结尾 这个正则目的是匹配所有css文件 
        test: /\.css$/,
        // css-loader只负责将css文件进行加载 不会去解析 也不会放入页面里去
        // style-loader负责将样式添加到DOM中
        // 使用多个loader时  会从右向左读
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        // 这里可以用数组 也可以用对象 方便往每个依赖中添加其他配置项
        use: [{loader:'style-loader'},{loader:'css-loader'},{loader:'less-loader'}]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 当加载的图片小于limit 会将图片编译成base64字符串形式
            // 当图片大于时  需要使用file-loader进行加载
            limit: 136397,
          // img是文件夹name是变量是图片名字但是不加中括号的话 图片名字变成写死的一个name
          // hash在图片名后面拼接一个哈希值 默认是32位 我们截取8位 .ext是动态生成图片自己的扩展名
          // 加上[] 的都是动态的
          name: 'img/[name].[hash:8].[ext]'
          },
        }]
      },
      {
        test: /\.js$/,
        // exclude:排除 include:包含  排除这里面的JS不去转化
        exclude: /(node_module|bower_components)/,
        use: {
          loader: 'babel-loader',
          options:{
            presets:['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve:{
    extensions: ['.js', '.vue'], // 省略以上文件后缀名不写
    // 这一步操作就等于选择了runtime-compiler
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer:{
    contentBase: './dist',   //表示用于服务这个文件夹
    inline: true,    // 实时监听
    port: 8080   // 选择端口 不写的话默认就是8080
  }
}