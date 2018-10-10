<template>
  <div>
    <p><strong>123</strong></p>
    <p><strong>123</strong></p>
    <pre><code
data-language="javascript"
               class="lang-javascript">function normal(value) {
               console.log(this.id);
               const error = new Error();
               return value.replace();
               }
    </code></pre>
  </div>
</template>
<script>
import { getDetail } from '@api';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import '@asset/css/highlight.scss';
export default {
  data () {
    return {
      content: null
    };
  },
  created () {
    this.getDetail();
  },
  mounted () {
    hljs.initHighlightingOnLoad();
  },
  methods: {
    async getDetail () {
      const param = this.$router.query;
      this.content = await getDetail(param);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@asset/css/common.scss';
</style>
