'use strict';
module.exports = {
  constant: [
    'https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/muse-ui@3.0.0/dist/muse-ui.js',
    'https://cdn.jsdelivr.net/npm/highlight.js@9.14.2/lib/highlight.js',
    'https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/quill@1.3.6/dist/quill.min.js'
  ],
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'muse-ui': 'MuseUI',
    jquery: 'jQuery',
    'highlight': 'hljs',
    'quill': 'Quill'
  },
}