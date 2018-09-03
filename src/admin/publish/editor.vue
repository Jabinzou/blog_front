<template>
  <div class="publish-wrap clearfix">
    <mu-form :model="article" class="mu-demo-form" :label-position="labelPosition" label-width="100">
      <mu-form-item prop="title" label="Title">
        <mu-text-field v-model="article.title"></mu-text-field>
      </mu-form-item>
    </mu-form>
    <div id="editor"></div>
    <mu-button
      color="primary"
      class="right"
      @click="getIner">Publish</mu-button>
  </div>
</template>
<script>
import Editor from 'tui-editor';
import 'codemirror/lib/codemirror.css'; // codemirror
import 'tui-editor/dist/tui-editor.css'; // editor ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor content
import 'highlight.js/styles/atom-one-dark.css'; // editor code block css
export default {
  data () {
    return {
      editor: null, // editor instance
      article: {
        title: '',
        tag: [],
        cate: '',
        content: ''
      },
      labelPosition: 'top'
    };
  },
  mounted () {
    this.editor = Editor.factory({
      el: document.querySelector('#editor'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '600px',
      language: 'zh',
      exts: ['scrollSync'],
      codeBlockLanguages: ['javascript', 'css', 'html', 'typescript']
    });
  },
  methods: {
    getIner () {
      const lo = this.editor;
      console.log(lo.getHtml());
      // console.log(lo.convertor.toHTMLWithCodeHightlight())
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@asset/css/common.scss';
</style>
