<template>
  <div
    v-html="content"
    class="article-detail"/>
</template>
<script>
import { getDetail } from '@api';
import 'highlight.js/styles/atom-one-dark.css';
import '@asset/css/highlight.scss';
import '@asset/css/markdown.scss';
import hljs from 'highlight';
const highlightCode = () => {
  const preEl = document.querySelectorAll('pre');
  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};
export default {
  data () {
    return {
      content: null
    };
  },
  created () {
    highlightCode();
  },
  mounted () {
    this.getDetail();
  },
  updated () {
    highlightCode();
  },
  methods: {
    async getDetail () {
      const param = this.$route.params;
      const result = await getDetail(param);
      this.content = result.content || '';
    }
  }
};
</script>
<style lang="scss" scoped>
// @import '@asset/css/common.scss';

.article-detail {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 10px 16px;
  width: 100%;
}
@media (min-width: 992px) {
  .article-detail {
    width: 75%;
  }
}
</style>
