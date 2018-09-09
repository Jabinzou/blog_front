<template>
  <div class="publish-wrap clearfix">
    <mu-appbar
      style="width: 100%;"
      color="#e91e63">
      <mu-button
        icon
        @click="menuBar=true"
        slot="left">
        <mu-icon value="menu"/>
      </mu-button>
      小可爱的奏折
    </mu-appbar>
    <mu-drawer
      :open.sync="menuBar"
      :docked="false"
      :right="false"
      style="background:#f8f8f8">
      <mu-list>
        <mu-list-item
          button
          v-for="(item, index) in menuData"
          :key="index">
          <mu-icon
            size="22"
            :value="item.icon"
            :color="item.color"/>
          <mu-list-item-title>{{ item.value }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <div class="publish__content">
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
      labelPosition: 'top',
      menuData: [
        {
          icon: 'settings', // icon
          value: '发布',
          color: 'rgb(76, 175, 80)'

        }
      ],
      menuBar: false // menu list toggle
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
<style lang="scss">
@import '@asset/css/common.scss';
.publish-wrap{
  .mu-item-title {
    padding-left: 10px;
  }
  .mu-chip {
    background: $color-pink;
    color: #fff;
    svg {
      color: #fff;
    }
  }
  .publish__content {
    margin: 20px;
  }
  .publish-form {
    width: 600px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 4px 4px 20px $color-pink;
    margin-bottom: 10px;
  }
  .publish__footer{
    margin: 20px 0;
    text-align: center;
  }
}

</style>
