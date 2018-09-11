<template>
  <div>
    <div class="publish-form">
      <mu-form
        :model="article"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="100">
        <mu-form-item
          prop="title"
          label="Title">
          <mu-text-field
            v-model="article.title"
            color="#f48fb1"
            underline-color="#f48fb1"/>
        </mu-form-item>
        <mu-form-item
          prop="tag"
          label="Tag">
          <mu-select
            filterable
            multiple
            chips
            v-model="article.tag"
            full-width
            underline-color="#f48fb1"
            color="#f48fb1">
            <mu-option
              v-for="(tag, index) in exitedData.tags"
              :key="index"
              :label="tag.name"
              :value="tag.id"/>
          </mu-select>
        </mu-form-item>
        <mu-form-item
          prop="cate"
          label="Category">
          <mu-select
            v-model="article.cate"
            filterable
            tags
            underline-color="#f48fb1"
            color="#e040fb">
            <mu-option
              v-for="(item, index) in exitedData.cates"
              :key="index"
              :label="item.name"
              :value="item.id">
              <mu-list-item-action avatar>
                <mu-avatar
                  :size="22"
                  color="#e040fb">
                  {{ item.name.substring(0, 1) }}
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.name }}</mu-list-item-title>
              </mu-list-item-content>
            </mu-option>
          </mu-select>
        </mu-form-item>
      </mu-form>
    </div>
    <div id="editor"/>
    <div class="publish__footer">
      <mu-button
        color="indigo400"
        @click="getIner">Publish</mu-button>
    </div>
  </div>
</template>
<script>
import Editor from 'tui-editor';
import { getCate } from '@api';
import 'codemirror/lib/codemirror.css'; // codemirror
import 'tui-editor/dist/tui-editor.css'; // editor ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor content
import 'highlight.js/styles/atom-one-dark.css'; // editor code block css
export default {
  name: 'Publish',
  data () {
    return {
      editor: null, // editor instance
      article: {
        title: '',
        tag: [],
        cate: '',
        content: ''
      },
      exitedData: {
        cates: [{
          id: 1,
          name: '123'
        }, {
          id: 2,
          name: '456'
        }],
        tags: [{
          id: 1,
          name: '123'
        }, {
          id: 2,
          name: '456'
        }]
      }, // 拉取对应的值
      labelPosition: 'top'
    };
  },
  async created () {
    await getCate();
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
<style lang="sass">

</style>
