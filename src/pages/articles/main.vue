<template>
  <div>
    <p><strong>123</strong></p>
   <p><strong>123</strong></p>
   <pre><code data-language="javascript" class="lang-javascript">var noHighlightRe    = /^(no-?highlight|plain|text)$/i,
      languagePrefixRe = /\blang(?:uage)?-([\w-]+)\b/i,
      fixMarkupRe      = /((^(&lt;[^&gt;]+&gt;|\t|)+|(?:\n)))/gm;

var spanEndTag = '&lt;/span&gt;';
function escape(value) {
    return value.replace(/&amp;/g, '&amp;amp;').replace(/&lt;/g, '&amp;lt;').replace(/&gt;/g, '&amp;gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

</code></pre>
  </div>
</template>
<script>
import { getList } from '@api';
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js';
export default {
  data() {
    return{

    }
  },
  async created() {
    await getList();
  },
  mounted() {
    hljs.initHighlightingOnLoad();
  }
}
</script>
<style lang="scss" scoped>
@import '@asset/css/highlight.scss';
</style>


