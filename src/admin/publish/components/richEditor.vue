<template>
  <div class="quill-editor">
    <slot name="toolbar"/>
    <div ref="editor"/>
  </div>
</template>
<script>
import Quill from 'quill';
import hljs from 'highlight.js';
import 'quill/dist/quill.snow.css';
import options from './constant.js';
export default {
  name: 'QuillEditor',
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
    }
  },
  data () {
    return {
      defaultOptions: {
        modules: {
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      quill: null,
      contentValue: ''
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.initialize();
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
    initialize () {
      if (this.$el) {
        // Options
        this.defaultOptions = Object.assign({}, options, this.options);
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
}
</style>
