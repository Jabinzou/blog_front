<template>
  <div class="publish-wrap">
    <div id="editor"></div>
     <mu-button color="primary" @click="getIner">Primary</mu-button>
  </div>
</template>
<script>
import Editor from 'tui-editor';
export default {
  data() {
    return {
      editor: null // editor instance
    }
  },
  mounted() {
    this.editor =  Editor.factory({
      el: document.querySelector('#editor'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '600px',
      language: 'zh',
      exts: ['scrollSync'],
      codeBlockLanguages: ['javascript','css','html']
    });
  },
  methods: {
    getIner() {
      const lo =  this.editor;
      console.log(lo.getMarkdown());
      console.log(lo.convertor.toHTMLWithCodeHightlight())
    }
  }
}
</script>
<style lang="scss">
@import 'codemirror/lib/codemirror.css'; // codemirror
@import 'tui-editor/dist/tui-editor.css'; // editor ui
@import 'tui-editor/dist/tui-editor-contents.css'; // editor content

</style>


