<template>
  <div class="blog-publish">
    <mu-expansion-panel
      :expand="panel === 'panel1'"
      @change="toggle('panel1')">
      <div slot="header">文章信息</div>
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
    </mu-expansion-panel>
    <mu-expansion-panel
      :expand="panel === 'panel2'"
      @change="toggle('panel2')">
      <div slot="header">文章内容</div>
      <quill-editor
        ref="myTextEditor"
        id="rich-editor"
        :options="options"
        v-model="article.content"/>
    </mu-expansion-panel>
    <mu-dialog
      width="360"
      transition="slide-bottom"
      fullscreen
      :append-body="false"
      :scrollable="true"
      :open.sync="openFullscreen">
      <mu-appbar
        color="primary"
        title="预览模式">
        <mu-button
          slot="left"
          icon
          @click="openFullscreen=false">
          <mu-icon value="close"/>
        </mu-button>
        <mu-button
          slot="right"
          flat
          @click="openFullscreen=false">
          Done
        </mu-button>
      </mu-appbar>
      <Preview :content="article.content"/>
    </mu-dialog>
    <div class="publish__footer">
      <mu-button
        color="indigo400"
        @click="publish">Publish</mu-button>
      <mu-button
        @click="openFullscreen=true">preview</mu-button>
    </div>
  </div>
</template>
<script>
import hljs from 'highlight.js';
import quillEditor from './richEditor';
import Preview from './preview';
import { getCate, getAllTags, publish } from '@api';
hljs.configure({ // optionally configure hljs
  languages: ['javascript', 'python', 'shell', 'nginx', 'css', 'json']
});
export default {
  name: 'Publish',
  data () {
    return {
      editor: null, // editor instance
      panel: 'panel1', // 展开编辑
      openFullscreen: false, // 预览窗口
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
      labelPosition: 'top',
      options: {
        modules: {
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  components: {
    quillEditor,
    Preview
  },
  mounted () {
    this.getTag();
    this.getCate();
  },
  methods: {
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
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
      const res = await publish(this.article);
      if (res.data.code === 1000) {
        this.$toast.success('发布成功!');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mu-appbar {
  position: fixed;
  width: 100%;
}
/deep/ .mu-dialog-body {
  width: 100%;
  max-height: 100% !important;
}
.blog-publish {
  #rich-editor {
    height: 600px;
  }
}
</style>
