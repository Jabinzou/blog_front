<template>
  <div
    class="detail-wraper">
    <div
      v-html="content"
      class="article-detail"/>
  </div>
</template>
<script>
import 'highlight.js/styles/atom-one-dark.css';
import '@asset/css/highlight.scss';
import '@asset/css/markdown.scss';
import hljs from 'highlight.js';
const highlightCode = () => {
  const preEl = document.querySelectorAll('pre');
  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};
export default {
  name: 'Preview',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  updated () {
    highlightCode();
  }
};
</script>
<style lang="scss" scoped>
.detail-wraper {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 80px 16px 10px 16px;
  width: 100%;
}
@media (min-width: 992px) {
  .detail-wraper {
    width: 75%;
  }
}
</style>
