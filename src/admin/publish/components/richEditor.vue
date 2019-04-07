<template>
  <div class="quill-editor">
    <slot name="toolbar"/>
    <div ref="editor"/>
    <lavi-upload
      ref="upload"
      file-key="file"
      :post-url="postUrl"
      :on-success="pasteImg"
      style="display: none;"/>
    <mu-dialog
      title="上传方式"
      width="360"
      :open.sync="openUploadChoose">
      请选择图片上传方式
      <mu-button
        slot="actions"
        color="primary"
        @click="imagHandler">本地</mu-button>
      <mu-button
        slot="actions"
        color="success"
        @click="openUploadChoose=false;openAlert=true">网络</mu-button>
    </mu-dialog>
    <mu-dialog
      title="请输入图片地址"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert">
      <mu-form
        ref="form"
        :model="contentInput"
        class="mu-demo-form">
        <mu-form-item
          label="content"
          help-text=""
          prop="name"
          :rules="rules">
          <mu-text-field
            v-model="contentInput.url"
            prop="name"/>
        </mu-form-item>
      </mu-form>
      <mu-button
        slot="actions"
        color="primary"
        @click="openAlert=false">cancel</mu-button>
      <mu-button
        slot="actions"
        color="success"
        @click="pasteImg"
        :disabled="!contentInput.url">confirm</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import 'highlight.js/styles/atom-one-light.css';
import 'highlight.js';
import 'quill-emoji/dist/quill-emoji.js';
import options from './constant.js';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import { deepMerge } from '@/utils/normal';
import ImageBlot from '@/plugin/quill-img';
import LaviUpload from '@/components/upload';
import imgLazy from '@/mixin/imgLazy';

export default {
  name: 'QuillEditor',
  mixins: [imgLazy],
  components: {
    LaviUpload
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    content: {
      type: String,
      default: ''
    },
    postUrl: {
      type: String,
      default: '/api/article/img-upload'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultOptions: {
      },
      contentValue: '',
      openAlert: false,
      contentInput: {
        url: ''
      },
      openChose: false,
      rules: [
        {validate: (val) => !!val, message: '必须填url'}
      ],
      openUploadChoose: false
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.initialize();
      this.quill.getModule('toolbar').addHandler('image', this.uploadMethod);
    });
  },
  beforeDestroy () {
    this.quill = null;
    delete this.quill;
  },
  watch: {
    value (newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.contentValue) {
          this.contentValue = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText('');
        }
      }
    }
  },
  methods: {
    uploadMethod () {
      this.openUploadChoose = true;
    },
    imagHandler () {
      this.openUploadChoose = false;
      this.$refs.upload.handleClick();
    },
    pasteImg (res) {
      const range = this.quill.getSelection().index;
      this.quill.insertEmbed(range || 0, 'imageBlot', {
        'data-src': (res && res.data) || this.contentInput.url
      });
      this.quill.setSelection(range + 1);
      this.observeLozad();
      this.openAlert = false;
    },
    initialize () {
      if (this.$el) {
        // Options
        this.defaultOptions = deepMerge(this.options, options);
        Quill.register({ 'formats/imageBlot': ImageBlot });
        // Instance
        this.quill = new Quill(this.$refs.editor, this.defaultOptions);

        this.quill.enable(false);
        // Set editor content
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content);
        }
        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true);
        }
        // Mark model as touched if editor lost focus
        this.quill.on('selection-change', range => {
          if (!range) {
            this.$emit('blur', this.quill);
          } else {
            this.$emit('focus', this.quill);
          }
        });
        // Update model if text changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.editor.children[0].innerHTML;
          const quill = this.quill;
          const text = this.quill.getText();
          if (html === '<p><br></p>') html = '';
          this.contentValue = html;
          this.$emit('input', this.contentValue);
          this.$emit('change', { html, text, quill });
        });
        // Emit ready event
        this.$emit('ready', this.quill);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.quill-editor {
  width: 100%;
  height: auto;
  & > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
  }
  .ql-container {
    height: calc(100% - 50px) !important;
  }
  /deep/ .textarea-emoji-control {
    display: none !important;
  }
}
</style>
