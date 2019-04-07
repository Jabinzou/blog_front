<script>
import upload from '@/utils/ajax';
export default {
  name: 'LaviUpload',
  props: {
    postUrl: {
      type: String,
      required: true,
      default: ''
    },
    fileKey: { // 上传文件的key值
      type: String,
      default: ''
    },
    name: { // 文件名字
      type: String,
      default: ''
    },
    addtionData: { // 额外参数
      type: Object,
      default: () => ({})
    },
    headers: {
      type: Object,
      default: () => ({})
    }, // 请求头
    withCredentials: {
      type: Boolean,
      default: false
    }, // 请求是否带cookie
    accept: {
      type: String,
      default: ''
    }, // 支持文件格式
    onSuccess: {
      type: Function,
      default: function () {}
    },
    onError: {
      type: Function,
      default: function () {}
    },
    beforeUpload: {
      type: Function,
      default: function () {}
    },
    onRemove: {
      type: Function,
      default: function () {}
    },
    fileList: {
      type: Array,
      default: () => ([])
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    httpRequest: { // 可自定义上传方式
      type: Function,
      default: upload
    }
  },
  data () {
    return {
      reqs: {},
      fileName: ''
    };
  },
  methods: {
    handleChange (ev) {
      const files = ev.target.files; // Array
      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files);
      if (postFiles.length === 0) { return; }
      postFiles.forEach(rawFile => {
        this.fileName = this.name || rawFile.name;
        this.upload(rawFile);
      });
    },
    upload (rawFile) {
      this.$refs.input.value = null;
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      const before = this.beforeUpload(rawFile);
      if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    post (rawFile) {
      const { uid } = rawFile; // 浏览器生成
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.addtionData,
        filename: this.fileName,
        fileKey: this.fileKey,
        url: this.postUrl,
        onProgress: e => {
          this.onProgress && this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess && this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError && this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick () {
      this.$refs.input.value = null;
      this.$refs.input.click();
    }
  },
  render (h) {
    const {
      fileName,
      handleChange,
      accept,
      handleClick
    } = this;
    const data = {
      class: {
        'lavi-upload': true
      },
      on: {
        click: handleClick
      }
    };
    return (
      <div {...data} tabindex="0" >
        <input class="lavi-upload__input" type="file" ref="input" name={fileName} on-change={handleChange} accept={accept}></input>
      </div>
    );
  }
};
</script>
