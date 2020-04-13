// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 16,//以750设计稿的根元素字体大小为准 iphone6/7/8 (html font-size: 16px;)
      propList: ['*']
    }
  }
}
