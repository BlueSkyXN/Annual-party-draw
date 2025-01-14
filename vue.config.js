module.exports = {
  publicPath: '/',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/javascript'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // 任何特殊编译器选项
        }
      }));
  }
};