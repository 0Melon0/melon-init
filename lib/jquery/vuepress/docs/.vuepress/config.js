const _navArr = require('./navArr.js');
module.exports = {
  title: 'VuePress',
  description: '长风破浪会有时,直挂云帆济沧海',
  head: [
    ['link', { rel: 'shortcut icon', href: '/melonIcon.ico', type: 'image/x-icon' }]
  ],
  themeConfig: {
    sidebar: 'auto',
    nav: _navArr(),
    search: false,
    smoothScroll: true
  },
  plugins: ['@vuepress/back-to-top', 'vuepress-plugin-mathjax', ['vuepress-plugin-code-copy', true]],
  markdown: {
    lineNumbers: true
  }
}