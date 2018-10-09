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
          prop="desc"
          label="Description">
          <mu-text-field
            v-model="article.desc"
            multi-line
            :rows="2"
            full-width
            color="#f48fb1"
            underline-color="#f48fb1"/>
        </mu-form-item>
        <mu-form-item
          prop="tagId"
          label="Tag">
          <mu-select
            filterable
            multiple
            chips
            v-model="article.tagId"
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
          prop="categoryId"
          label="Category">
          <mu-select
            v-model="article.categoryId"
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
        @click="publish">Publish</mu-button>
    </div>
  </div>
</template>
<script>
import Editor from 'tui-editor';
import { getCate, getAllTags, publish } from '@api';
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
        tagId: [],
        desc: '',
        categoryId: '',
        content: ''
      },
      exitedData: {
        cates: [],
        tags: []
      }, // 拉取对应的值
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
    this.getTag();
    this.getCate();
  },
  methods: {
    getIner () {
      const lo = this.editor;
      this.article.content = lo.getHtml();
    },
    /**
     * @description get tag
     */
    async getTag () {
      const res = await getAllTags();
      this.exitedData.tags = res.data.data.list || [];
    },
    /**
     * @description get cate
     */
    async getCate () {
      const res = await getCate();
      this.exitedData.cates = res.data.data.list || [];
    },
    /**
     * @description 发布文章
     */
    async publish () {
      this.getIner();
      const res = await publish(this.article);
      if (res.data.code === 1000) {
        this.$toast.success('发布成功!');
      }
    }
  }
};
</script>
<style lang="sass">

</style>
